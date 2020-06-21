<template>
  <div class="main-page w12">
    <div class="mb10" flex fdr fjb fic>
      <button class="click-content ta-c pt100 pb100 w5" @click="depositVisible = !depositVisible">입금</button>
      <button class="click-content ta-c pt100 pb100 w5" @click="withdrawVisible = !withdrawVisible">출금</button>
    </div>

    <div class="mb10" flex fdr fjb fic>
      <button class="click-content ta-c pt100 pb100 w5" @click="transferVisible = !transferVisible">계좌이체</button>
      <button class="click-content ta-c pt100 pb100 w5" @click="balanceVisible = !balanceVisible">잔액조회</button>
    </div>

    <div class="mb10" flex fdr fjc fic>
      <button class="click-content ta-c pt100 pb100 w6" @click="tradeVisible = !tradeVisible">거래내역 조회</button>
    </div>

    <a-modal v-model="depositVisible" title="정보입력" @ok="depositOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
        <input class="mt20 w12" placeholder="비밀번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="depositVisible2" title="입금금액" @ok="depositMoneyOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="금액을 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="withdrawVisible" title="정보입력" @ok="withdrawOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
        <input class="mt20 w12" placeholder="비밀번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="withdrawVisible2" title="출금금액" @ok="withdrawMoneyOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="금액을 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="transferVisible" title="정보입력" @ok="transferOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
        <input class="mt20 w12" placeholder="비밀번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="transferVisible2" title="상대방정보입력" @ok="transferOpponent">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="이름을 입력해주세요" />
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="transferVisible3" title="이체금액입력" @ok="transferMoney">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="금액을 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="balanceVisible" title="정보입력" @ok="balanceOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
        <input class="mt20 w12" placeholder="비밀번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="tradeVisible" title="정보입력" @ok="tradeOk">
      <div class="pl15 pr15">
        <input class="mt20 w12" placeholder="이름을 입력해주세요" />
        <input class="mt20 w12" placeholder="계좌번호를 입력해주세요" />
        <input class="mt20 w12" placeholder="비밀번호를 입력해주세요" />
      </div>
    </a-modal>

    <a-modal v-model="tradeVisible2" title="거래내역" @ok="tradeList">
      <div class="pt20 pb20 pl15 pr15">
        <div flex fic>
          <div>{{ moment().format("YYYY-MM-DD") }}</div>
          <div>김용연님에게 1000원 계좌이체</div>
        </div>
      </div>
    </a-modal>

    <a-modal v-model="amountVisible" title="총액" @ok="amountOk">
      <div class="pt20 pb20 pl15 pr15">
        총액: 123213123
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import moment from "moment";
import api from "~/utils/api";

@Component({
  components: {},
})
export default class extends Vue {
  moment: any = moment;

  amountVisible: boolean = false;

  //입금
  depositVisible: boolean = false;
  depositVisible2: boolean = false;
  depositMoney: number = 0;

  //출금
  withdrawVisible: boolean = false;
  withdrawVisible2: boolean = false;
  withdrawMoney: number = 0;

  //이체
  transferVisible: boolean = false;
  transferVisible2: boolean = false;
  transferVisible3: boolean = false;

  //잔약조회
  balanceVisible: boolean = false;

  //내역조회
  tradeVisible: boolean = false;
  tradeVisible2: boolean = false;

  async mounted() {
    let res = await api.get("/home");
    console.log(res);
  }

  depositOk() {
    this.depositVisible = false;
    this.depositVisible2 = true;
  }

  depositMoneyOk() {
    this.$message.info("입금이 완료되었습니다.");
    this.depositVisible2 = false;
    this.amountVisible = true;
  }

  withdrawOk() {
    this.withdrawVisible = false;
    this.withdrawVisible2 = true;
  }

  withdrawMoneyOk() {
    this.$message.info("출금이 완료되었습니다.");
    this.withdrawVisible2 = false;
    this.amountVisible = true;
  }

  transferOk() {
    this.transferVisible = false;
    this.transferVisible2 = true;
  }

  transferOpponent() {
    this.transferVisible2 = false;
    this.transferVisible3 = true;
  }

  transferMoney() {
    this.$message.info("이체가 완료되었습니다.");
    this.transferVisible3 = false;
    this.amountVisible = true;
  }

  balanceOk() {
    this.balanceVisible = false;
    this.amountVisible = true;
  }

  tradeOk() {
    this.tradeVisible = false;
    this.tradeVisible2 = true;
  }

  tradeList() {
    this.tradeVisible2 = false;
  }

  amountOk() {
    this.amountVisible = false;
  }
}
</script>

<style scoped lang="scss" src="./index.scss" />
