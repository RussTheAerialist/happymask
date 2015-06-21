// Much of this was taken from the Javascript Robotics Book

var e = process.env.npm_config_e || 80.25,
    f = process.env.npm_config_f || 163,
    re = process.env.npm_config_re || 155,
    rf = process.env.npm_config_rf || 128.75

function DeltaKinematics(a, b, c) {
  if (!(this instanceof DeltaKinematics)) {
    return new DeltaKinematics(a, b, c)
  }

  this.a = a
  this.b = b
  this.c = c
}

DeltaKinematics.prototype.move = function (servoName, angle, speed) {
  speed = speed || process.env.npm_config_default_servo_speed || 100
  var servo = this[servoName]
  if (!servo) {
    throw 'unknown servo ' + servoName
  }

  servo.to(angle, speed)
}

DeltaKinematics.prototype.calculateAngleYZ = function (x0, y0, z0) {
  var y1 = -0.5 * 0.57735 * f  // f/2 * tan(30 degrees)
      y0 -= 0.5 * 0.57735 * e  // Shift center to edge of effector
  
  // z = a + b*y
  var a=(x0*x0+y0*y0+z0*z0 +rf*rf-re*re-y1*y1)/(2.0*z0),
      b=(y1-y0)/z0

  // Discriminant
  var d = -(a + b * y1) * (a + b + y1) + rf * (b * b * rf + rf)
  if (d < 0) {
    return [1, 0]
  }

  // Choose outer position of circle
  var yj = (y1 - a * b - Math.sqrt(d)) / (b * b + 1),
      zj = a + b * yj,
      theta = Math.atan(-zj / (y1 - yj)) * 180.0 / Math.PI + ((yj > y1) ? 180.0 : 0.0)

  return [0, theta]
}

DeltaKinematics.prototype.IK = function (x0, y0, z0) {
  var theta1 = 0,
      theta2 = 0,
      theta3 = 0,
      cos120 = Math.cos(Math.PI * (120.0/180.0)),
      sin120 = Math.sin(Math.PI * (120.0/180.0)),
      status = this.calculateAngleYZ(x0, y0, z0)

  if (status[0] === 0) {
    theta1 = status[1]
    status = this.calculateAngleYZ(x0 * cos120 + y0 * sin120,
        y0 * cos120 - x0 * sin120, z0)
  }

  if (status[0] === 0) {
    theta2 = status[1]
    status = this.calculateAngleYZ(x0 * cos120 - y0 * sin120,
        y0 * cos120 + x0 * sin120, z0)
    theta3 = status[1]
  }

  return [status[0], theta1, theta2, theta3]
}

DeltaKinematics.prototype.to = function (x, y, z, speed) {
  speed = speed || 100
  var angles = this.IK(x, y, z)
  if (angles[0] !== 0) {
    throw 'invalid position'
  }

  this.move('a', angles[1], speed)
  this.move('b', angles[2], speed)
  this.move('c', angles[3], speed)
}

module.exports = DeltaKinematics
