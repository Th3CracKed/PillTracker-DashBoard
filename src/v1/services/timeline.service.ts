import TimelineSchema from '../models/timeline.model';
import { Timeline } from '../models';

export class TimelineService {

    getAllTimeline() {
        return TimelineSchema.find();
    }

    getTimelineById(timelineId: string) {
        return TimelineSchema.findById(timelineId);
    }

    createTimeline(timeline: Timeline) {
        const timelineSchema = new TimelineSchema(timeline);
        return timelineSchema.save();
    }

    async updateTimelineById(timelineId: string, newTimeline: Timeline, replace: boolean) {
        if (replace) {
            await TimelineSchema.findByIdAndUpdate(timelineId, newTimeline);
        } else {
            const reminders = newTimeline.reminders;
            delete newTimeline.reminders;
            await TimelineSchema.updateOne({ _id: timelineId },
                { ...newTimeline, $addToSet: { reminders: { $each: reminders || [] } } });
        }
    }

    deleteTimelineById(timelineId: string) {
        return TimelineSchema.findByIdAndDelete(timelineId);
    }

}

export let timelineService = new TimelineService();