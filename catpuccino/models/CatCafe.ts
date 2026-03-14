import mongoose, { Schema, model, models} from 'mongoose'; 

//defines the schema for the CatCafe model
const CatCafeSchema = new Schema({
    ownerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: [true, 'Owner ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Cafe name is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Cafe description is required'],
    },
    location: {
        type: String,
        default: "Unknown City",
    },
    operatingHours: {
        type: String,
        default: "9:00 AM - 8:00 PM",
    },
    priceRange: {
        type: String,
        default: "$$",
    },
    cafepic:{
        type:String,
        default:"/default-cafepic.png"
    },
    averages:{
        sociability: {
            type: Number,
            min: 1,
            max: 5,
            default: 0,
        },
        ambience: {
            type: Number,
            min: 1,
            max: 5,
            default: 0,
        },
        food: {
            type: Number,
            min: 1,
            max: 5,
            default: 0,
        },
        work_friendly: {
            type: Number,
            min: 1,
            max: 5,
            default: 0,
        },
        service: {
            type: Number,
            min: 1,
            max: 5,
            default: 0,
            
        },
        
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    menu: [{
        itemName: {
            type: String,
            required: [true, 'Menu item name is required'],
        },
        price: {
            type: Number,
            required: [true, 'Menu item price is required'],
        },
        description: {
            type: String,
            required: [true, 'Menu item description is required'], 
        },
        pictureUrl: {
            type: String,
            default: "/default-menu-item.png",
        },
        upVotes:{
            type:Number,
        }
    }],
    cats: [{
        name: {
            type: String,
            required: [true, 'Cat name is required'],
        },
        breed: {
            type: String,
            required: [true, 'Cat breed is required'],
        },
        description: {
            type: String,
            required: [true, 'Cat description is required'],
        },
        pictureUrl: {
            type: String,  
            required: [true, 'Cat picture URL is required'],
            default: "/default-cat.png",
        },
        upVotes:{
            type:Number,
        }
    }],




});

// Don't delete this one 
const CatCafe = models.CatCafe || model('CatCafe', CatCafeSchema);

export default CatCafe;