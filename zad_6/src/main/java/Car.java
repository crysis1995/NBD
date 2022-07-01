import java.lang.reflect.Array;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Car {

    public Car(String modelName,
        String brandName,
        double mileageKm,
        double enginePower,
        boolean isElectric){
        this.modelName =modelName;
        this.brandName =brandName;
        this.mileageKm =mileageKm;
        this.enginePower =enginePower;
        this.isElectric =isElectric;
    }
    public String modelName;
    public String brandName;
    public double mileageKm;
    public double enginePower;
    public boolean isElectric;

}
