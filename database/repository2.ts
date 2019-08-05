import mongodb = require("mongodb");

export class Repository2 {
    public static connect(callback: () => any) {
        mongodb.MongoClient.connect("mongodb+srv://n_lahham:WNEo38YlbdKtyb2O@maincluster-widdi.azure.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
        .then((client: mongodb.MongoClient) => {
            this.client = client;
            console.log("MongoDB connected sucessfully!");
            callback();
        }).catch((err) => {
            console.log("EEEEEEEEEEErrrrrrrrrrrrrrrrrrrrrrrrrrror", err);
        });
    }

    public static logout(callback: () => any) {
        this.client.logout()
            .then((res) => {
                console.log("MongDB logged out sucessfully", res);
                callback();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    private static client: mongodb.MongoClient;
}
