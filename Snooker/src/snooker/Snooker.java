/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package snooker;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;
import javafx.scene.shape.StrokeLineCap;
import javafx.stage.Stage;
import snooker.objects.Ball;
import snooker.objects.Table;

/**
 *
 * @author martin
 */
public class Snooker extends Application {
    
    private static boolean collision;
    private static Rectangle rect;
    private static Table table;
    private static List<Ball> balls;
    private static ScheduledExecutorService exec;

    @Override
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("./FXMLDocument.fxml"));
        balls = new ArrayList();
        Ball white = new Ball(new Circle(0, 0, 50));    // <<< Neprotina
//        Ball white = new Ball(new Circle(120, 120, 50)); // <<< Protina
        balls.add(white);
        rect = new Rectangle(900, 450, Color.WHITE);
        rect.setStroke(Color.BLACK);
        rect.setStrokeWidth(10);
        rect.setStrokeLineCap(StrokeLineCap.ROUND);
        AnchorPane testPane = new AnchorPane();
        testPane.setStyle("-fx-background-color:white");
        testPane.setPrefSize(1100, 650);
        double[] cords = cords(new Rectangle(testPane.getPrefWidth(), testPane.getPrefHeight()), rect);
        rect.setLayoutX(cords[0]);
        rect.setLayoutY(cords[1]);
        table = new Table(rect);
        System.out.println(table.getBounds() + "\n" + table.getxCord() + " " + rect.getX());
        testPane.getChildren().addAll(rect, balls.get(0).getBounds());
        Scene test = new Scene(testPane);
        stage.setScene(test);
        stage.setTitle("Snooker");
        stage.show();
        runCollisionCheck();
    }

    public static double[] cords(Rectangle screen, Rectangle obj) {
        double[] cordinates = {0, 0};
        cordinates[0] = (screen.getWidth() - obj.getWidth()) / 2;
        System.out.println(cordinates[0]);
        cordinates[1] = (screen.getWidth() - obj.getWidth()) / 2;
        System.out.println(cordinates[1]);
        return cordinates;
    }

    public static void runCollisionCheck() {
        exec = Executors.newSingleThreadScheduledExecutor();
        exec.scheduleAtFixedRate(() -> {
            checkCollision();
        }, 1, 5, TimeUnit.SECONDS);
    }

    public static boolean checkCollision() {
        balls.forEach(el -> {
            System.out.println(el.getBounds());
            Shape intersect = Shape.intersect(el.getBounds(), table.getBounds());
            if(intersect.getBoundsInLocal().getWidth() != -1) {
                System.out.println("Collision!");
                dummyMethod("fuck you lambda");
            }
        });
        if(collision) {
            collision = false;
            return true;
        }
        System.out.println("No collision!");
        return false;
    }
    public static void dummyMethod(String wtfIsWrongWithJavaLambdas) {
        collision = true;
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> exec.shutdownNow()));
        launch(args);
    }

}
