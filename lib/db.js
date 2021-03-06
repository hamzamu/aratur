posts = new Meteor.Collection("posts");
comments = new Meteor.Collection("comments");
rates = new Meteor.Collection("rates");
tags = new Meteor.Collection("tags");


Images = new FS.Collection("images", {
    stores: [
      //new FS.Store.FileSystem("images"),
      new FS.Store.GridFS("images"),
      new FS.Store.GridFS("thumbs", {
            transformWrite: function (fileObj, readStream, writeStream) {
                // Transform the image into a 10x10px thumbnail
                gm(readStream, fileObj.name()).resize('650', '400').stream().pipe(writeStream);
            }
        }), 
        
        new FS.Store.GridFS("small", {
            transformWrite: function (fileObj, readStream, writeStream) {
                // Transform the image into a 10x10px thumbnail
                gm(readStream, fileObj.name()).resize('128', '128').stream().pipe(writeStream);
            }
        })
        
        
    ],
    filter: {
        maxSize: 1048576,
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});



//Images = new FS.Collection("images", {
//  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
//});