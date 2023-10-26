import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export class GlobalNameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content?.replace(/Mike/gi, 'Michael');
  }
}