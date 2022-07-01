import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.DeleteValue;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.api.commands.kv.UpdateValue;
import com.basho.riak.client.core.RiakCluster;
import com.basho.riak.client.core.RiakNode;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;
import com.basho.riak.client.core.query.RiakObject;
import com.basho.riak.client.core.util.BinaryValue;
import com.google.gson.Gson;

import java.net.UnknownHostException;

public class Program {
    private static RiakCluster setUpCluster() throws UnknownHostException {
        // This example will use only one node listening on localhost:10017
        RiakNode node = new RiakNode.Builder()
                .withRemoteAddress("127.0.0.1")
                .withRemotePort(8087)
                .build();

        RiakCluster cluster = new RiakCluster.Builder(node)
                .build();
        cluster.start();

        return cluster;
    }

    public static void main( String[] args ) {
        try {
            Car car = new Car("Model S","Tesla",45123d,1000d,true);
            Gson gson = new Gson();

            RiakObject quoteObject = new RiakObject()
                    .setContentType("application/json")
                    .setValue(BinaryValue.create(gson.toJson(car)));

            Namespace quotesBucket = new Namespace("s25746");


            Location quoteObjectLocation = new Location(quotesBucket, "car_key");

            StoreValue storeOp = new StoreValue.Builder(quoteObject)
                    .withLocation(quoteObjectLocation)
                    .build();


            RiakCluster cluster = setUpCluster();
            RiakClient client = new RiakClient(cluster);


            StoreValue.Response storeOpResp = client.execute(storeOp);


            FetchValue fetchOp = new FetchValue.Builder(quoteObjectLocation)
                    .build();
            RiakObject fetchedObject = client.execute(fetchOp).getValue(RiakObject.class);

            System.out.println(fetchedObject.getValue());


            Car fetchedCar = gson.fromJson(String.valueOf(fetchedObject.getValue()),Car.class);
            fetchedCar.isElectric = false;
            fetchedCar.mileageKm = fetchedCar.mileageKm + 7678123;

            fetchedObject.setValue(BinaryValue.create(gson.toJson(fetchedCar)));
            StoreValue updateOp = new StoreValue.Builder(fetchedObject)
                    .withLocation(quoteObjectLocation)
                    .build();
            StoreValue.Response updateOpResp = client.execute(updateOp);

            fetchOp = new FetchValue.Builder(quoteObjectLocation)
                    .build();
            fetchedObject = client.execute(fetchOp).getValue(RiakObject.class);

            System.out.println(fetchedObject.getValue());



            DeleteValue deleteOp = new DeleteValue.Builder(quoteObjectLocation)
                    .build();
            client.execute(deleteOp);



            fetchOp = new FetchValue.Builder(quoteObjectLocation)
                    .build();
            fetchedObject = client.execute(fetchOp).getValue(RiakObject.class);

            System.out.println(fetchedObject.getValue());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


}
