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
public class Force {

    double weight;
    private Vector vector;
//    double friction = snooker.Snooker.getTable().getFriction();

    public Force(double weight, Vector vector) {
        this.weight = weight;
        this.vector = vector;
    }
    
    public double[] getCurrentForce(Vector apply) {
        double[] temp = vector.getCords();
        for(int i = 0; i < temp.length; i++) {
            temp[i] = temp[i] + 1;
        }
        temp[0] = temp[0] + 1;
        vector.setCords(temp);
        return temp;
    }
}
