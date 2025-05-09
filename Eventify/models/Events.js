import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    host_name: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    },
    event_location: {
        type: String,
        required: true
    },
    event_time: {
        type: String,
        required: true
    }
}, 
{capped: {size: 10000, max: 20}}
)
const Event = mongoose.model('Event', eventSchema);
export default Event;