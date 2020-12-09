
  # Backend

Requests documentation

-------------------------------------------------------------------------------------

    - Class 
        GETS
            -> GET '/classes' - List all Classes
            -> GET '/classes/count' - Count all classes in the system
            -> GET '/classes/:description' - Find class by description
        POSTS
            -> POST '/classes/seed' - Populate classes DB
            -> POST '/classes' - Add one class to the DB    
                Body: {
                        "description": "Class 1 edited"    
                    }
        PUT
            -> PUT '/classes/:id' - Edits one classe's info    
                Body: {
                        "description": "Class 1 edited"    
                    }
        DELETE
            -> DELETE '/classes/:id' -> removes the class from DB

------------------------------------------------------------------------------------

    - Class Types
        GETS
            -> GET '/classTypes' - List all ClassTypes
            -> GET '/classTypes/count' - Count all classTypes in the system
            -> GET '/classTypes/:id' - Find classType by id

        POSTS
            -> POST '/classtypes/seed' - Populate classTypes DB
            -> POST '/classtypes' - Add one class to the DB    
                Body: {
                            "NotificationType" : 2,
                            "Class" : "5fba703366da032417175706"
                    }
        PUT
            -> PUT '/classtypes/:id' - Edits one classtype's info
            Body: {
                    "NotificationType" : 4,
                    "Class" : "5fba703366da032417175706"
                }
        DELETE 
            -> DELETE '/classtypes/:id' - removes the classtype from DB

------------------------------------------------------------------------------------

    - Notifications
        GETS
            -> GET '/notifications' - lists all notifications
            -> GET '/notifications/count' - counts all notifications
            -> GET '/notifications/:id' - shows one notification by id
        POSTS
            -> POST '/notifications' - adds one notification
                Body: {
                        "detectionDate": "12/03/2000",
                        "videoLink": "video link 1",
                        "seen": false,
                        "NotificationType": "720p",
                        "Camera": "5fba9430139c03ab7b0affca"
                    }
            -> POST '/notifications/seed' - Populates the DB with notifications
            -> POST '/notifications/yolo' - adds one notification from yolo
                Body: {
                        "idUser": "idUser",
                        "idCamera": "idCamera",
                        "timestamp": "timestamp",
                        "urlVideo": "videoLink",
                        "classes": [classe.description]
                    }
        PUT
            -> PUT '/notifications/:id' - edits one notification
                Body: {
                        "detectionDate": "12/03/2000",
                        "videoLink": "video link 1 edited",
                        "seen": false,
                        "NotificationType": "720p",
                        "Camera": "5fba9430139c03ab7b0affca"
                    }
        DELETE
            -> DELETE '/notifications/:id' - removes one notification


------------------------------------------------------------------------------------
    - Camera
        GETS
            -> GET '/cameras' - lists all system's cameras
            -> GET '/cameras/count' - counts all system's cameras
            -> GET '/cameras/:id' - Gets one camera by id
        POSTS
            -> POST '/cameras/seed' - Populates the DB with cameras
            -> POST '/cameras' - adds one camera to the system
                Body: {
                        "name": "camera 1",
                        "macAddress": "Mac address 1",
                        "Classtype": "5fba8d3ea9cb9698bf27bf21"
                        }
        PUT
            -> PUT '/cameras/:id' - edits one camera's information
                Body: {
                        "name": "camera 3 edited",
                        "macAddress": "Mac address 3 edited",
                        "Classtype": "5fba8d3ea9cb9698bf27bf21"
                        }
        DELETE
            -> DELETE '/cameras/:id' - removes one camera from the system


------------------------------------------------------------------------------------

    - Subscription
        GETS
            -> GET '/subscriptions' - lists all subscriptions
            -> GET '/subscriptions/count' - counts all subscriptions
            -> GET '/subscriptions/:id' - shows one subscription type
        POSTS
            -> POST '/subscriptions/seed' - Populates the DB with subscription types
            -> POST '/subscriptions'
                Body:{
                        "description": "Base",
                        "price": "2,99",
                        "nrCameras": 2,
                        "videoMaxQuality": "720p",
                        "captureStorage": "1024"
                    }

        PUT
            -> PUT '/subscriptions/:id' - edits one subscription type
                Body: {
                        "description": "Base added edited",
                        "price": "2,99",
                        "nrCameras": 2,
                        "videoMaxQuality": "720p",
                        "captureStorage": "1024"
                    }
        DELETE
            -> DELETE '/subscriptions/:id' - deletes one subscription type

------------------------------------------------------------------------------------

    - User
        GETS
            -> GET '/users' - lists all users
            -> GET '/users/count' - counts all users
            -> GET '/users/:id' - shows one user
        POSTS
            -> POST '/users' - adds one user to the system
                Body:
                    {
                        "username": "Strapi user 2",
                        "email": "user2@strapi.io",
                        "password": "strapiPassword",
                        "confirmed": true,
                        "mobile": "911111112",
                        "subscription":{
                                    "_id": "5fba9fcbb53c61cd02133041",
                                    "description": "Base",
                                    "price": "2,99",
                                    "nrCameras": 2,
                                    "videoMaxQuality": "720p",
                                    "captureStorage": "1024",
                                    "createdAt": "2020-11-22T17:28:43.468Z",
                                    "updatedAt": "2020-11-22T17:28:43.468Z",
                                    "__v": 0,
                                    "id": "5fba9fcbb53c61cd02133041"
                                },
                        "cameras": [{
                                        "_id": "5fba9430139c03ab7b0affca",
                                        "name": "camera 1",
                                        "macAddress": "Mac address 1",
                                        "createdAt": "2020-11-22T16:39:12.769Z",
                                        "updatedAt": "2020-11-22T16:39:12.769Z",
                                        "__v": 0,
                                        "id": "5fba9430139c03ab7b0affca"
                                    }],
                        "notifications": [{
                                            "seen": false,
                                            "_id": "5fba9f5077f983cbd6284709",
                                            "detectionDate": "12/03/2000",
                                            "videoLink": "video link 1",
                                            "createdAt": "2020-11-22T17:26:40.798Z",
                                            "updatedAt": "2020-11-22T17:26:40.810Z",
                                            "__v": 0,
                                            "Camera": {
                                                "_id": "5fba9430139c03ab7b0affcb",
                                                "name": "camera 2",
                                                "macAddress": "Mac address 2",
                                                "createdAt": "2020-11-22T16:39:12.782Z",
                                                "updatedAt": "2020-11-22T16:39:12.782Z",
                                                "__v": 0,
                                                "id": "5fba9430139c03ab7b0affcb"
                                            },
                                            "Classtype": {
                                                "_id": "5fba8d3ea9cb9698bf27bf21",
                                                "NotificationType": 2,
                                                "createdAt": "2020-11-22T16:09:34.240Z",
                                                "updatedAt": "2020-11-22T16:09:34.244Z",
                                                "__v": 0,
                                                "Class": "5fba74e153a8334ac08c35d0",
                                                "id": "5fba8d3ea9cb9698bf27bf21"
                                            },
                                            "id": "5fba9f5077f983cbd6284709"
                                        }]
                    }
        PUT
            -> PUT '/users/:id' - edits user
                Body: {
                        "username": "Strapi user 3 edited",
                        "email": "user3@strapi.io",
                        "password": "strapiPassword",
                        "confirmed": true,
                        "mobile": "911111113",
                        "subscription":{
                                    "_id": "5fba9fcbb53c61cd02133041",
                                    "description": "Base",
                                    "price": "2,99",
                                    "nrCameras": 2,
                                    "videoMaxQuality": "720p",
                                    "captureStorage": "1024",
                                    "createdAt": "2020-11-22T17:28:43.468Z",
                                    "updatedAt": "2020-11-22T17:28:43.468Z",
                                    "__v": 0,
                                    "id": "5fba9fcbb53c61cd02133041"
                                },
                        "cameras": [{
                                        "_id": "5fba9430139c03ab7b0affca",
                                        "name": "camera 1",
                                        "macAddress": "Mac address 1",
                                        "createdAt": "2020-11-22T16:39:12.769Z",
                                        "updatedAt": "2020-11-22T16:39:12.769Z",
                                        "__v": 0,
                                        "id": "5fba9430139c03ab7b0affca"
                                    }],
                        "notifications": [{
                                            "seen": false,
                                            "_id": "5fba9f5077f983cbd6284709",
                                            "detectionDate": "12/03/2000",
                                            "videoLink": "video link 1",
                                            "createdAt": "2020-11-22T17:26:40.798Z",
                                            "updatedAt": "2020-11-22T17:26:40.810Z",
                                            "__v": 0,
                                            "Camera": {
                                                "_id": "5fba9430139c03ab7b0affcb",
                                                "name": "camera 2",
                                                "macAddress": "Mac address 2",
                                                "createdAt": "2020-11-22T16:39:12.782Z",
                                                "updatedAt": "2020-11-22T16:39:12.782Z",
                                                "__v": 0,
                                                "id": "5fba9430139c03ab7b0affcb"
                                            },
                                            "Classtype": {
                                                "_id": "5fba8d3ea9cb9698bf27bf21",
                                                "NotificationType": 2,
                                                "createdAt": "2020-11-22T16:09:34.240Z",
                                                "updatedAt": "2020-11-22T16:09:34.244Z",
                                                "__v": 0,
                                                "Class": "5fba74e153a8334ac08c35d0",
                                                "id": "5fba8d3ea9cb9698bf27bf21"
                                            },
                                            "id": "5fba9f5077f983cbd6284709"
                                        }]
                    }

        DELETE
            -> DELETE '/users/:id' - Apaga um user 

------------------------------------------------------------------------------------



Order for populating the DB
    - Class
    - ClassTypes
    - Cameras 
    - Notification
    - Subscription