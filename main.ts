import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as n from "@cdktf/provider-null";
import * as r from "@cdktf/provider-random";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new n.NullProvider(this, "null");
    new r.RandomProvider(this, "random");

    const pet = new r.Pet(this, "my-pet");
    const resource = new n.Resource(this, "hello-world");
    resource.addOverride("provisioner", [
      {
        "local-exec": {
          command: `echo 'Hello ${pet}'`,
        },
      },
    ]);
  }
}

const app = new App();
new MyStack(app, "cdktf-github-actions-local");
app.synth();
