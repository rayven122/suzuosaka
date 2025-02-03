import Button from "./Button";
import { details } from "@/types/cms-types";

type Props = {
  gameData: details;
};

export default function StatusButton({ gameData }: Props) {
  if (!gameData.status) return <Button noLink={true}>近日登場</Button>;

  return gameData.status[0] === "完売" ? (
    <Button noLink={true}>完売</Button>
  ) : gameData.status[0] === "販売中" ? (
    <Button link={gameData.saleLink} blank={true}>
      販売ページ
    </Button>
  ) : gameData.status[0] === "予約受付中" ? (
    <Button link={gameData.reservationLink} blank={true}>
      予約ページ
    </Button>
  ) : (
    <Button noLink={true}>近日登場</Button>
  );
}
