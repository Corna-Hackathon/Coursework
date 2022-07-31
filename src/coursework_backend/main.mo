import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Option "mo:base/Option"

actor {
  public type Customer = {
    name : Text;
    age : Text;
    phone : Text;
    sex : Bool;
    address : Text;
  };

  stable var upgradeCanisters : [(Nat, Customer)] = [];
  var customerList = HashMap.HashMap<Nat, Customer>(0, Nat.equal, Hash.hash);
  stable var next = 0;

  system func preupgrade() {
    upgradeCanisters := Iter.toArray(customerList.entries());
  };

  system func postupgrade() {
    customerList := HashMap.fromIter<Nat, Customer>(upgradeCanisters.vals(), 0, Nat.equal, Hash.hash);
    upgradeCanisters := [];
  };

  public func createAccount(cus: Customer)  {
    customerList.put(next, cus);
    next += 1;
  };
  
  public func readAccount() : async [(Nat, Customer)] {
    var returnValue : [(Nat, Customer)] = [];
    returnValue := Iter.toArray(customerList.entries());
    return(returnValue);
  };

  public func updateAccount(id : Nat, cus : Customer) : async ?Customer {
    return customerList.replace(id, cus)
  };

  public func deleteAccount(id : Nat) : async ?Customer {
    return customerList.remove(id)
  };

};

