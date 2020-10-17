/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker.objects;

/**
 *
 * @author davidmitic
 */
public class Vector {
    
    double[] cord1;
    double[] cord2;
    double[] cords;

    public Vector(double[] cord1, double[] cord2) {
        this.cord1 = cord1;
        this.cord2 = cord2;
//TODO        cords = {cord1[0], cord1[1] cord2[0], cord2[1]};
    }

    public Vector(double[] cords) {
        this.cords = cords;
    }

    public double[] getCords() {
        return cords;
    }

    public void setCords(double[] cords) {
        this.cords = cords;
    }
    
            
}
