import { Stage } from "../../../../components";
import { useRouter } from "next/router";
import mockData from "../../../../utils/mockData";

export default function StagePage(props) {
  const router = useRouter();
  const { projectId, stage } = router.query;

  return <Stage data={mockData[0].inspiration}></Stage>;
}
