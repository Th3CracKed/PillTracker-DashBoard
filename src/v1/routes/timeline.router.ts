import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { timelineController } from '../controllers/timeline.controller';
import { body, check } from 'express-validator';
import { isJsonValid, validateFn } from '../../utils';
import { timelineJsonSchema, timelineRequired } from '../models';
const router = express.Router();

/**
 * Get All Timelines
 */
router.get('',
    timelineController.getAllTimeline);


/**
 * Get timeline by id
 */
router.get('/:id',
    [check('id').exists().trim()],
    timelineController.getTimelineById);


/**
 * Create Timeline
 */
router.post('',
    [body().custom(isJsonValid(timelineJsonSchema, timelineRequired))],
    validateFn(timelineController.createTimeline));

/**
 * Update Timeline, adding reminders to existing when
 */
router.post('/:id',
    [check('id').exists().trim(),
    body().custom(isJsonValid(timelineJsonSchema))],
    (req: Request, res: Response, next: NextFunction) => {
        (<any>req).replace = false;
        next();
    },
    validateFn(timelineController.updateTimelineById));

/**
 * Update Timeline (replace)
 */
router.put('/:id',
    [check('id').exists().trim(),
    body().custom(isJsonValid(timelineJsonSchema))],
    (req: Request, res: Response, next: NextFunction) => {
        (<any>req).replace = true;
        next();
    },
    validateFn(timelineController.updateTimelineById));

/**
 * Delete Timeline
 */
router.delete('/:id',
    [check('id').exists().trim()],
    validateFn(timelineController.deleteTimelineById));

export { router as timelineRouter };