import os

# 从 GitHub 获取原始私钥
RAW_KEY = os.getenv('MY_PRIVATE_KEY', '').strip()

# 自动处理格式
if RAW_KEY.startswith('0x'):
    clean_key = RAW_KEY[2:]  # 去掉 0x，给波场用
    eth_key = RAW_KEY        # 保留 0x，给 Polygon 用
else:
    clean_key = RAW_KEY      # 给波场用
    eth_key = '0x' + RAW_KEY # 补上 0x，给 Polygon 用

# 这样你的代码就“通”了：
# tron.private_key_to_address(clean_key)  <-- 波场用这个
# w3.eth.account.from_key(eth_key)        <-- 以太坊/Polygon 用这个
