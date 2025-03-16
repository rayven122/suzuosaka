import { FacilityInfo } from "./_components/FacilityInfo";
import { FishingAssistant } from "./_components/FishingAssistant";

export default function InfoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-main font-sans">
      <FacilityInfo />
      <FishingAssistant />
    </div>
  );
}
