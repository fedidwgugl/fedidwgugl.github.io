var intersectionCalculator = {
        slope: function (x1, y1, x2, y2) {
            if (x1 == x2) return false;
            return (y1 - y2) / (x1 - x2);
        },
        yInt: function (x1, y1, x2, y2) {
            if (x1 === x2) return y1 === 0 ? 0 : false;
            if (y1 === y2) return y1;
            return y1 - this.slope(x1, y1, x2, y2) * x1 ;
        },
        getXInt: function (x1, y1, x2, y2) {
            var slope;
            if (y1 === y2) return x1 == 0 ? 0 : false;
            if (x1 === x2) return x1;
            return (-1 * ((slope = this.slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
        },
        getIntersection: function (x11, y11, x12, y12, x21, y21, x22, y22) {
            var slope1, slope2, yint1, yint2, intx, inty;
            if (x11 == x21 && y11 == y21) return [x11, y11];
            if (x12 == x22 && y12 == y22) return [x12, y22];

            slope1 = this.slope(x11, y11, x12, y12);
            slope2 = this.slope(x21, y21, x22, y22);
            if (slope1 === slope2) return false;

            yint1 = this.yInt(x11, y11, x12, y12);
            yint2 = this.yInt(x21, y21, x22, y22);
            if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

            if (slope1 === false) return [y21, slope2 * y21 + yint2];
            if (slope2 === false) return [y11, slope1 * y11 + yint1];
            intx = (slope1 * x11 + yint1 - yint2)/ slope2;
            return [intx, slope1 * intx + yint1];
        },
        getOverlapPolygon: function (bar1, bar2) {
            let r1 = Math.sqrt(Math.pow(bar1.width/2,2) + Math.pow(bar1.height/2,2));
            let c1 = Math.atan2(bar1.height/2,bar1.width/2); 
            let t1 = bar1.angle / 180.0 * Math.PI;
            let r2 = Math.sqrt(Math.pow(bar2.width/2,2) + Math.pow(bar2.height/2,2));
            let c2 = Math.atan2(bar2.height/2,bar2.width/2); 
            let t2 = bar2.angle / 180.0 * Math.PI;
            console.log(r1,c1,t1,r2,c2,t2);
            var points = Array();
            var x1 = bar1.x;
            var x2 = bar2.x;
            var y1 = bar1.y;
            var y2 = bar2.y;
            var w1 = bar1.width/2;
            var w2 = bar2.width/2;
            var h1 = bar1.height/2;
            var h2 = bar2.height/2;
            points.push( 
                           this.getIntersection(
                                              x1+r1*Math.cos(t1+c1),
                                              y1+r1*Math.sin(t1+c1),
                                              x1+r1*Math.cos(Math.PI-c1+t1),
                                              y1+r1*Math.sin(Math.PI-c1+t1),
                                              x2+r2*Math.cos(t2+c2),
                                              y2+r2*Math.sin(t2+c2),
                                              x2+r2*Math.cos(Math.PI-c2+t2),
                                              y2+r2*Math.sin(Math.PI-c2+t2),
                                            ),
                                            /*
                           this.getIntersection(
                                              bar1.x+r1*Math.cos(t1+c1),
                                              bar1.y+r1*Math.sin(t1+c1),
                                              bar1.x+r1*Math.cos(Math.PI+t1-c1),
                                              bar1.y+r1*Math.sin(Math.PI+t1-c1),
                                              bar2.x+r2*Math.cos(t2-c2),
                                              bar2.y+r2*Math.sin(t2-c2),
                                              bar2.x+r2*Math.cos(Math.PI+t2+c2),
                                              bar2.y+r2*Math.sin(Math.PI+t2+c2),
                                            ),*/
                       );
            return points;
        }

    }
