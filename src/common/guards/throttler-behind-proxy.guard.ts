import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';
import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip;
  }
  protected async throwThrottlingException(
    _context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail
  ): Promise<void> {
    throw new HttpException(
      `Too many requests! Please wait ${throttlerLimitDetail.ttl} seconds before retrying.`,
      HttpStatus.TOO_MANY_REQUESTS
    );
  }
}
