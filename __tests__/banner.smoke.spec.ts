import { BannerPlugin } from "../BannerPlugin";
import { BannerAdminResolver } from "../api/BannerAdminResolver";
import {
  bootstrapPluginSmokeServer,
  createPluginSmokeEnvironment,
  expectPluginRegistered,
} from "../../__tests__/smoke-test-utils";

describe("BannerPlugin smoke", () => {
  const { server } = createPluginSmokeEnvironment(BannerPlugin);

  beforeAll(async () => {
    await bootstrapPluginSmokeServer(server);
  });

  afterAll(async () => {
    await server.destroy();
  });

  it("registers plugin and admin resolver", () => {
    expectPluginRegistered(BannerPlugin, server);
    expect(server.app.get(BannerAdminResolver)).toBeDefined();
  });
});
