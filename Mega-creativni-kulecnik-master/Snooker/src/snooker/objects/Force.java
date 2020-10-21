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
    private final Vector vector;
//    double friction = snooker.Snooker.getTable().getFriction();

    public Force(double weight, Vector vector) {
        this.weight = weight;
        this.vector = vector;
    }

}
