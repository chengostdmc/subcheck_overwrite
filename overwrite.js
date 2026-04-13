function main(config) {
  const proxyCount = Array.isArray(config?.proxies) ? config.proxies.length : 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" &&
    config["proxy-providers"] !== null
      ? Object.keys(config["proxy-providers"]).length
      : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // ===== 基础配置 =====
  config["allow-lan"] = false; // 已确认：禁止局域网连接
  config["bind-address"] = "*";
  config["mode"] = "rule";
  config["log-level"] = "warning";

  config["ipv6"] = true;
  config["find-process-mode"] = "strict";
  config["tcp-concurrent"] = true;
  config["unified-delay"] = true;
  config["keep-alive-interval"] = 30;
  config["keep-alive-idle"] = 600;
  config["global-client-fingerprint"] = "chrome";
  config["udp"] = true;

  config["geodata-mode"] = true;
  config["geodata-loader"] = "memconservative";
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 72;
  config["geosite-matcher"] = "succinct";

  config["profile"] = {
    "store-selected": true,
    "store-fake-ip": true,
  };

  // ===== Sniffer 配置 =====
  config["sniffer"] = {
    enable: true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    sniff: {
      TLS: {
        ports: [443, 8443],
      },
      HTTP: {
        ports: [80, "8080-8880"],
        "override-destination": true,
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
  };

  // 注意：已根据要求彻底移除了 dns 配置块

  // ===== 删除原有字段后重建 =====
  delete config["proxy-groups"];
  delete config["rule-providers"];
  delete config["rules"];

  // ===== 分组配置 =====
  config["proxy-groups"] = [
    {
      name: "节点选择",
      type: "select",
      proxies: [
        "自动选择",
        // 已确认：不再引用"全部节点"
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
        "DIRECT",
      ],
    },
    {
      // 已确认：保留该分组，供其他客户端直接在面板上查看所有节点时使用
      name: "全部节点",
      type: "select",
      "include-all": true,
    },
    {
      name: "自动选择",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      proxies: [
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "AI",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Google",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Game",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Emby",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "PayPal",
      type: "select",
      proxies: ["United States"],
    },
    {
      name: "Bilibili",
      type: "select",
      proxies: ["Hong Kong", "Taiwan", "DIRECT"],
    },
    {
      name: "Spotify",
      type: "select",
      proxies: [
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Apple",
      type: "select",
      proxies: ["DIRECT", "United States"],
    },
    {
      name: "Github",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Telegram",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
      ],
    },
    {
      name: "Facebook",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Global Media",
      type: "select",
      proxies: [
        "自动选择",
        "Hong Kong",
        "Taiwan",
        "Japan",
        "Singapore",
        "Korea",
        "United States",
        "非主流国家",
      ],
    },
    {
      name: "Global Direct",
      type: "select",
      proxies: ["DIRECT"],
    },
    // 以下为地区自动测速组
    {
      name: "Hong Kong",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter: "(?i)(港|🇭🇰|HK|Hong|HKG)",
    },
    {
      name: "Taiwan",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter: "(?i)(🇹🇼|台|TW|Taiwan)",
    },
    {
      name: "Japan",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter: "(?i)(日|🇯🇵|JP|Japan|NRT|HND|KIX|CTS|FUK)",
      "exclude-filter": "尼日利亚",
    },
    {
      name: "Korea",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter: "(?i)(🇰🇷|韩|KR|Korea)",
    },
    {
      name: "Singapore",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter: "(?i)(🇸🇬|新|SG|Singapore)",
    },
    {
      name: "United States",
      type: "url-test",
      url: "http://1.0.0.1/generate_204", // 已确认：添加测速URL
      interval: 300,
      tolerance: 50,
      lazy: true,
      timeout: 3000,
      "max-failed-times": 3,
      hidden: true,
      "include-all": true,
      filter:
        "(?i)(美|🇺🇸|US|USA|JFK|SJC|LAX|ORD|ATL|DFW|SFO|MIA|SEA|IAD|United States)",
      "exclude-filter": "Australia",
    },
    {
      name: "非主流国家",
      type: "select",
      "include-all": true,
      "exclude-filter":
        "(?i)(DIRECT|直接|美|港|台|日|韩|欧|🇭🇰|🇺🇸|🇯🇵|HK|TW|SG|JP|KR|US|NRT|LAX|HKG|TPE|SIN)",
    },
  ];

  // ===== Rule Providers 配置 =====
  config["rule-providers"] = {
    Advertising: {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
      behavior: "classical",
      path: "./rulesets/reject.txt",
      format: "text",
      interval: 86400,
    },
    "Advertising-drop": {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt",
      behavior: "classical",
      path: "./rulesets/reject-drop.txt",
      format: "text",
      interval: 86400,
    },
    "Advertising-ip": {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/ip/reject.txt",
      behavior: "classical",
      path: "./rulesets/reject_ip.txt",
      format: "text",
      interval: 86400,
    },
    Apple: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Apple.mrs",
      behavior: "domain",
      path: "./rulesets/Apple.mrs",
      format: "mrs",
      interval: 86400,
    },
    Apple_CN: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/AppleCN.mrs",
      behavior: "ipcidr",
      path: "./rulesets/AppleCN.mrs",
      format: "mrs",
      interval: 86400,
    },
    ChinaMax: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/ChinaMax/ChinaMax_Classical.yaml",
      behavior: "classical",
      path: "./rulesets/ChinaMax.yaml", // 已确认：统一路径命名为 ChinaMax.yaml
      format: "yaml",
      interval: 86400,
    },
    Github: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/GitHub.mrs",
      behavior: "domain",
      path: "./rulesets/Github.mrs",
      format: "mrs",
      interval: 86400,
    },
    Patreon: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Patreon/Patreon_No_Resolve.yaml",
      behavior: "classical",
      path: "./rulesets/Patreon_No_Resolve.yaml",
      format: "yaml",
      interval: 86400,
    },
    Microsoft: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml",
      behavior: "classical",
      path: "./rulesets/Microsoft.yaml",
      format: "yaml",
      interval: 86400,
    },
    YouTube: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml",
      behavior: "classical",
      path: "./rulesets/YouTube.yaml",
      format: "yaml",
      interval: 86400,
    },
    Spotify: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Spotify.mrs",
      behavior: "domain",
      path: "./rulesets/Spotify.mrs",
      format: "mrs",
      interval: 86400,
    },
    Telegram: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Telegram.mrs",
      behavior: "domain",
      path: "./rulesets/Telegram.mrs",
      format: "mrs",
      interval: 86400,
    },
    Telegram_ip: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/Telegram.mrs",
      behavior: "ipcidr",
      path: "./rulesets/Telegram_ip.mrs",
      format: "mrs",
      interval: 86400,
    },
    PayPal: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/PayPal.mrs",
      behavior: "domain",
      path: "./rulesets/PayPal.mrs",
      format: "mrs",
      interval: 86400,
    },
    Emby: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Emby.mrs",
      behavior: "domain",
      path: "./rulesets/Emby.mrs",
      format: "mrs",
      interval: 86400,
    },
    Emby_ip: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/Emby.mrs",
      behavior: "ipcidr",
      path: "./rulesets/Emby_ip.mrs",
      format: "mrs",
      interval: 86400,
    },
    AI: {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/non_ip/ai.txt",
      behavior: "classical",
      path: "./rulesets/ai_non_ip.txt",
      format: "text",
      interval: 86400,
    },
    Google: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Google.mrs",
      behavior: "domain",
      path: "./rulesets/google.mrs",
      format: "mrs",
      interval: 86400,
    },
    Google_ip: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/Google.mrs",
      behavior: "ipcidr",
      path: "./rulesets/google_ip.mrs",
      format: "mrs",
      interval: 86400,
    },
    Game: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Games.mrs",
      behavior: "domain",
      path: "./rulesets/games.mrs",
      format: "mrs",
      interval: 86400,
    },
    BiliBiliIntl: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBiliIntl/BiliBiliIntl_No_Resolve.yaml",
      behavior: "classical",
      path: "./rulesets/BiliBiliIntl_No_Resolve.yaml",
      format: "yaml",
      interval: 86400,
    },
    BiliBili: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BiliBili/BiliBili_No_Resolve.yaml",
      behavior: "classical",
      path: "./rulesets/BiliBili_No_Resolve.yaml",
      format: "yaml",
      interval: 86400,
    },
    GlobalMedia: {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/non_ip/stream.txt",
      behavior: "classical",
      path: "./rulesets/stream.txt",
      format: "text",
      interval: 86400,
    },
    "GlobalMedia-ip": {
      type: "http",
      url: "https://ruleset.skk.moe/Clash/ip/stream.txt",
      behavior: "classical",
      path: "./rulesets/stream_ip.txt",
      format: "text",
      interval: 86400,
    },
    Notion: {
      type: "http",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Notion/Notion.yaml",
      behavior: "classical",
      path: "./rulesets/Notion.yaml",
      format: "yaml",
      interval: 86400,
    },
    ESET_China: {
      type: "http",
      url: "https://kelee.one/Tool/Clash/Rule/ESET_China.yaml",
      behavior: "classical",
      path: "./rulesets/ESET_China.yaml",
      format: "yaml",
      interval: 86400,
    },
    Privacy: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Private.mrs",
      behavior: "domain",
      path: "./rulesets/Private.mrs",
      format: "mrs",
      interval: 86400,
    },
    Privacy_ip: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/Private.mrs",
      behavior: "ipcidr",
      path: "./rulesets/Private_ip.mrs",
      format: "mrs",
      interval: 86400,
    },
    Facebook: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/domain/Facebook.mrs",
      behavior: "domain",
      path: "./rulesets/Facebook.mrs",
      format: "mrs",
      interval: 86400,
    },
    Facebook_ip: {
      type: "http",
      url: "https://github.com/666OS/rules/raw/refs/heads/release/mihomo/ip/Facebook.mrs",
      behavior: "ipcidr",
      path: "./rulesets/Facebook_ip.mrs",
      format: "mrs",
      interval: 86400,
    },
  };

  // ===== 分流规则 =====
  config["rules"] = [
    "RULE-SET,Advertising,REJECT",
    "RULE-SET,Advertising-drop,REJECT-DROP",
    "RULE-SET,Privacy,REJECT",
    "DOMAIN-SUFFIX,immersivetranslate.com,AI",
    "DOMAIN-SUFFIX,daniuxx.xyz,Facebook",
    "DOMAIN-SUFFIX,mox.moe,Telegram",
    "DOMAIN-SUFFIX,mxomo.com,Telegram",
    "DOMAIN-SUFFIX,perplexity.ai,AI",
    "DOMAIN-SUFFIX,poe.com,AI",
    "DOMAIN-SUFFIX,hohai.eu.org,Emby",
    "DOMAIN-SUFFIX,oceancloud.asia,Emby",
    "DOMAIN-SUFFIX,vime50.com,Emby",
    "DOMAIN-SUFFIX,fufuvip.violet.run,Emby",
    "DOMAIN-SUFFIX,5203166.xyz,Emby",
    "DOMAIN-SUFFIX,lilyemby.my,Emby",
    "RULE-SET,AI,AI",
    "RULE-SET,Apple,Apple",
    "RULE-SET,Google,Google",
    "RULE-SET,Facebook,Facebook",
    "RULE-SET,YouTube,Google",
    "RULE-SET,Github,Github",
    "RULE-SET,Microsoft,Github",
    "RULE-SET,Patreon,Github",
    "RULE-SET,Spotify,Spotify",
    "RULE-SET,Telegram,Telegram",
    "RULE-SET,PayPal,PayPal",
    "RULE-SET,Emby,Emby",
    "RULE-SET,GlobalMedia,Global Media",
    "RULE-SET,Game,Game",
    "RULE-SET,Notion,Github",
    "RULE-SET,BiliBiliIntl,Bilibili",
    "RULE-SET,BiliBili,Bilibili",
    "DOMAIN-SUFFIX,ovalyraa.com,DIRECT",
    "RULE-SET,Apple_CN,DIRECT",
    "DOMAIN-SUFFIX,bytecatcode.org,DIRECT",
    "DOMAIN-SUFFIX,hydrogen1693.com,DIRECT",
    "DOMAIN-SUFFIX,lamclod.cn,DIRECT",
    "RULE-SET,ChinaMax,DIRECT",
    "RULE-SET,ESET_China,DIRECT",
    "RULE-SET,Advertising-ip,REJECT",
    "RULE-SET,Privacy_ip,REJECT",
    "RULE-SET,GlobalMedia-ip,Global Media",
    "RULE-SET,Telegram_ip,Telegram",
    "RULE-SET,Facebook_ip,Facebook",
    "RULE-SET,Google_ip,Google",
    "RULE-SET,Emby_ip,Emby",
    "GEOIP,CN,Global Direct,no-resolve",
    "MATCH,节点选择",
  ];

  return config;
}
