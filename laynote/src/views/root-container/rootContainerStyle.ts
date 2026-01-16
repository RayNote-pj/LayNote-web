import { css } from '@emotion/react';

export const container = css`
  display: flex;     /* 좌측 바 + 메인 */
  flex: 1;           /* 헤더 제외한 나머지 */
  min-height: 0;     /* ⭐⭐⭐ 이게 핵심 */
`;
