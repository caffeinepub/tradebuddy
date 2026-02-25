import AccessControl "authorization/access-control";

module {
  type OldActor = {};
  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    price : ?Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      price = null;
    };
  };
};
