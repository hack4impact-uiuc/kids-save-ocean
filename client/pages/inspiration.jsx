import { Stage } from "../components";
import mockData from "../utils/mockData";

export default function Inspiration(props) {
  return <Stage data={mockData[0].inspiration}></Stage>;
}
