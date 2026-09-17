import { redirect } from 'next/navigation';

const REEL_URL = 'https://www.instagram.com/reel/DdZGBLsRdyn/?stkn=cGxsZzFyaTYzNDdy';

export default function Page() {
  redirect(REEL_URL);
}
