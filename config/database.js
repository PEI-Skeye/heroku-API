module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri:
          "mongodb://skeyeDB:SkeyeDBPass@cluster0-shard-00-00.rmsvc.mongodb.net:27017,cluster0-shard-00-01.rmsvc.mongodb.net:27017,cluster0-shard-00-02.rmsvc.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
      },
      options: {
        ssl: true,
      },
    },
  },
});
