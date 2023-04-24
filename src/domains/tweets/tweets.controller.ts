import { Controller } from '@nestjs/common';

import { Domain } from '../../shared/enums/domain.enums';

@Controller(Domain.TWEETS)
export class TweetsController {}
