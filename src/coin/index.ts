import { Address, constractHelper } from "sk-chain";

/**
 * @desc 子货币例子
 */
export class CoinContract extends constractHelper.BaseContract {
  constructor() {
    super();
    // 初始化代币余额
    this.balances = {
      "12D3KooWHdhPrGCqsjD8j6yiHfumdzxfRxyYNPxJKN99RfgtoRuq": 10000n,
    };
  }

  // private 不可被外部读取
  private balances: { [key: string]: bigint };

  // public 可被外部调用
  public send = (receiver: Address, amount: bigint) => {
    if (this.balances[receiver.did] > amount) {
      return;
    }
    if (!this.balances[receiver.did]) {
      this.balances[receiver.did] = 0n;
    }
    this.balances[receiver.did] += amount;
    this.balances[this.msg.sender.did] -= amount;
  };
}
