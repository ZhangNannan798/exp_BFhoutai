let mongoose = require('mongoose');
let path = require('path')
class Db {
    constructor(dbName) {
        this.url = `mongodb://127.0.0.1:27017/${dbName}`
    }
    connect() {
        if (Db.hasConnected) {
            return true;
        }
        let p = new Promise((resolve, reject) => {
            mongoose.connect(this.url, { useNewUrlParser: true , useUnifiedTopology: true }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    Db.hasConnected = true;
                    resolve()
                }

            })
        })
        return p;
    }
    async insert(modeName,data,callback ){
        try{
            await this.connect()
            this.SModel(modeName).insertMany(data,(err,data)=>{
                callback(data)
            })
        }catch(err){
            callback(err)
        }
    }
    
    SModel(modelName) {
        let sPath = path.join(__dirname, 'Schema', modelName);
        let model = mongoose.model(modelName, require(sPath));
        return model;
    }
    async find(modelName, query, callback) {
        try {
            await this.connect();
            this.SModel(modelName).find(query, (err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }
    async insertName(modelName, query, callback) {
        try {
            await this.connect();
            this.SModel(modelName).insertMany(query, (err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }
    async count(modelName, data, callback) {
        try {
            await this.connect();
            this.SModel(modelName).count(data, (err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }
    async insertFilm(modelName, data, callback) {
        try {
            await this.connect();
            this.SModel(modelName).insertMany(data, (err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }
    async deleteOne(modelName,id,callback) {
        try {
            await this.connect();
            this.SModel(modelName).findByIdAndDelete(id,(err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }
    async upDateOne(modelName,id,json1,callback) {
        try {
            await this.connect();
            this.SModel(modelName).findByIdAndUpdate(id,json1,(err, result) => {
                callback(result)
            })
        } catch (err) {
            callback(err)
        }
    }


}
Db.hasConnected = false;
module.exports = Db;