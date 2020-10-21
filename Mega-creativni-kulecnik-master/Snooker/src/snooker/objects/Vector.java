/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker.objects;

import java.util.Arrays;

/**
 *
 * @author davidmitic
 */
public class Vector {

    double[] cord1;
    double[] cord2;
    double[][] cords;

    public Vector(double[] cord1, double[] cord2) {
        this.cord1 = cord1;
        this.cord2 = cord2;
        this.cords = new double[2][2];
        cords[0] = cord1;
        cords[1] = cord2;
    }

    public Vector(double x1, double y1, double x2, double y2) {
        this.cord1 = new double[]{x1, y1};
        this.cord2 = new double[]{x2, y2};
        this.cords = new double[2][2];
        cords[0] = cord1;
        cords[1] = cord2;
    }

    public Vector(double[][] cords) {
        this.cords = cords;
        this.cord1 = cords[0];
        this.cord1 = cords[1];
    }

    public double[] getMove() {
        double[] answer = {cord2[0] - cord1[0], cord2[1] - cord1[1]};
        return answer;
    }

}
