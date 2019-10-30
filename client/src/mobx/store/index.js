import GlobalStore from "./global";
import ExampleStore from "./example";

const stores = {
  Global: new GlobalStore(),
  Example: new ExampleStore()
};
export default stores;
