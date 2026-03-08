
name: EU_Merge_And_Genesis_Action

on:
  push:
    branches: [ "main" ] # 只要你往表面层推代码，立刻触发

jobs:
  genesis_job:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 执行暴力合并脚本
        run: |
          chmod +x ./force_merge.sh
          ./force_merge.sh

      - name: 代币蹦出上链
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          RPC_URL: ${{ secrets.RPC_URL }}
        run: |
          npm install
          npx hardhat run scripts/genesis_deploy.js --network mainnet
