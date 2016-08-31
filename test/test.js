
const assert = require('chai').assert;
const dateext = require('../dist/date-ext.min');
describe('Date',function(){
    describe('diff',function(){
        it('should be 1 day when new Date(2016,7,31) diff by new Date(2016,8,1)',function(){
            var d = new Date(2016,7,31);
            var d2 = new Date(2016,8,1);
            var diff = d.diff(d2,'d.HH:mm:ss');
            assert.equal(diff,'1.00:00:00');
        });

        it('should be -1 day when new Date(2016,8,1) diff by new Date(2016,7,31)',function(){
            var d = new Date(2016,8,1);
            var d2 = new Date(2016,7,31);
            var diff = d.diff(d2,'d.HH:mm:ss');
            assert.equal(diff,'-1.00:00:00');
        });

        it('should be 0 day when new Date(2016,8,1) diff by new Date(2016,8,1)',function(){
            var d = new Date(2016,8,1);
            var diff = d.diff(d,'d.HH:mm:ss',true);
            assert.equal(diff,'00');

            var diff1 = d.diff(d,'d.HH:mm:ss',false);
            assert.equal(diff1,'0.00:00:00')
        });
    });
});
