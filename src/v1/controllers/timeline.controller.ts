import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Timeline } from '../models';
import { timelineService } from '../services';

export class TimelineController {

    getAllTimeline(req: Request, res: Response) {
        timelineService.getAllTimeline()
        .then(timelines => res.json(timelines))
        .catch(err => res.status(404).json(err));
    }

    getTimelineById(req: Request, res: Response) {
        const timelineId: string = matchedData(req).id;
        timelineService.getTimelineById(timelineId)
        .then(timeline => res.json(timeline))
        .catch(err => res.status(404).json(err));
    }

    createTimeline(req: Request, res: Response) {
        const timeline: Timeline = matchedData(req)[''];
        timelineService.createTimeline(timeline)
            .then((createdTimeline) => res.json(createdTimeline))
            .catch((err: any) => res.status(500).json(err));
    }

    updateTimelineById(req: Request, res: Response) {
        const timelineId: string = matchedData(req).id;
        const newTimeline: Timeline = matchedData(req)[''];
        const replace: boolean = (<any>req).replace;
        timelineService.updateTimelineById(timelineId, newTimeline, replace)
            .then(() => res.json('Update Successfully'))
            .catch((err: any) => res.status(500).json(err));
    }

    deleteTimelineById(req: Request, res: Response) {
        const timelineId: string = matchedData(req).id;
        timelineService.deleteTimelineById(timelineId)
            .then((updatedTimeline) => res.json(updatedTimeline))
            .catch((err: any) => res.status(500).json(err));
    }

}
export let timelineController = new TimelineController();