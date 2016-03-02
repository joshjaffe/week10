var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function() {
    console.log('READY');
});

// robot.on('sensordata', function (data) {
//   console.log('SENSOR DATA', data);
// });

var keypress = require('keypress');
velocity = { left: 0, right: 0 };
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    console.log('got "keypress"', key);
    if (!key) return;

    if (key.name == 'w') {
        console.log("moved up");
        //up(10);
        velocity.left += 10;
        velocity.right += 10;
        robot.drive(velocity);
        //robot.rtsTrue();
    } else if (key.name == 's') {
        velocity.left -= 10;
        velocity.right -= 10;
        robot.drive(velocity);
        //robot.rtsFalse();
    } else if (key.name == 'd') {
        velocity.left -= 5;
        velocity.right += 5;
        robot.drive(velocity);
        console.log("moved right");
        //turnRightDegrees(10);
    } else if (key.name == 'a') {
        velocity.left += 5;
        velocity.right -= 5;
        robot.drive(velocity);
        console.log("moved left");
        //turnLeftDegrees(10);
    } else if (key.name == 'space') {
        console.log("stop me");
        velocity.left = 0;
        velocity.right = 0;
        robot.drive(velocity);
    } else if (key.name == 'f') {
        console.log("fullMode");
        robot.fullMode();
    } else if (key.name == 'p') {
        console.log("passiveMode");
        robot.passiveMode();
    } else if (key.name == 'g') {
        console.log("go -- safeMode");
        robot.safeMode();
    } else if (key.name == 'q') {
        console.log("play song");
        mysong = [
            [293,300],
            [329,300],
            [293,300],
            [261,300],
            [246,300],
            [261,300],
            [293,500],
            [220,300],
            [246,300],
            [261,500],
            [246,300],
            [261,300],
            [293,500],
            [293,300],
            [329,300],
            [293,300],
            [261,300],
            [246,300],
            [261,300],
            [293,500],
            [220,500],
            [293,500],
            [246,300],
            [196,500],


            [523,200],
            [494,200],
            [440,200],
            [392,200],
            [349,500],
            [392,200],
            [440,300],
            [523,300],
            [493,300],
            [440,450],
            [392,200],
            [349,300],
            [329,1000],
            [440,300],
            [392,300],
            [349,300],
            [329,300],
            [293,200],
            [329,300],
            [349,300],
            [440,300],
            [415,300],
            [349,200],
            [329,300],
            [293,300],
            [261,500],
            [261,300],
            [293,300],
            [440,300],
            [440,700],
            [523,600],
            [493,300],
            [392,1000],
            [246,300],
            [261,300],
            [349,200],
            [349,600],
            [440,500],
            [392,300],
            [349,300],
            [329,200],
            [329,200]







        ];
        robot.sing(mysong);
    }


    if (key && key.ctrl && key.name == 'c') {
        console.log('shift control.c');
        process.exit();
        //process.stdin.pause();
    }
});


process.stdin.setRawMode(true);

process.stdin.resume();
batteryVolts = 0;
robot.on('sensordata', function(data) {
    if (batteryVolts !== data.battery.voltage.volts) {
        batteryVolts = data.battery.voltage.volts;
        console.log('voltage', batteryVolts);
    }
});
robot.on('bump', function(e) {
    console.log('BUMP', e);
});
robot.on('button', function(e) {
    console.log('BUTTON', e);
});
robot.on('cliff', function(e) {
    console.log('CLIFF', e);
});
robot.on('ir', function(e) {
    console.log('IR', e);
});
robot.on('mode', function(e) {
    console.log('MODE', e);
});
robot.on('overcurrent', function(e) {
    console.log('OVERCURRENT', e);
});
robot.on('virtualwall', function(e) {
    console.log('VIRTUALWALL', e);
});
robot.on('wall', function(e) {
    console.log('WALL', e);
});
robot.on('wheeldrop', function(e) {
    console.log('WHEELDROP', e);
});
