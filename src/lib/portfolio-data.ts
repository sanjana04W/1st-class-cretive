/** Curated list of portfolio images from the /public directory.
 *  These map to the actual product images uploaded by 1st Class Creative.
 */

export type PortfolioCategory =
  | "resin-creations"
  | "wedding-invitations"
  | "cake-boxes"
  | "custom-frames"
  | "keychains"
  | "gift-boxes";

export interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  title: string;
  featured?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  // ── Resin Keychains ───────────────────────────────────────────────────
  {
    id: "pk-01",
    src: "/484810488_1103650881774158_3999044029988274536_n.jpg",
    alt: "Glitter resin letter keychain with heart charm by 1st Class Creative",
    category: "keychains",
    title: "Glitter Letter Keychain",
    featured: true,
  },
  {
    id: "pk-02",
    src: "/542752181_1238639424941969_1583669488507158905_n.jpg",
    alt: "Colourful personalised resin letter keychains collection",
    category: "keychains",
    title: "Personalised Letter Keychains",
    featured: true,
  },
  {
    id: "pk-03",
    src: "/485071447_1104905628315350_9185351632911157955_n.jpg",
    alt: "Custom resin keychain set",
    category: "keychains",
    title: "Custom Resin Keychain Set",
  },
  {
    id: "pk-04",
    src: "/486050900_1104905634982016_7559173272180647798_n.jpg",
    alt: "Pastel resin keychains",
    category: "keychains",
    title: "Pastel Resin Keychains",
  },
  {
    id: "pk-05",
    src: "/485406732_1104905618315351_2664544872828850254_n.jpg",
    alt: "Sparkle resin keychain",
    category: "keychains",
    title: "Sparkle Resin Keychain",
  },
  {
    id: "pk-06",
    src: "/542751225_1238632091609369_5301087910891703266_n.jpg",
    alt: "Mixed colour letter resin keychains",
    category: "keychains",
    title: "Mixed Colour Letter Keychains",
  },
  {
    id: "pk-07",
    src: "/543123096_1238637104942201_1667295338167499961_n.jpg",
    alt: "Name resin keychain craft",
    category: "keychains",
    title: "Name Resin Keychain",
  },
  {
    id: "pk-08",
    src: "/543439793_1238632114942700_5237334051114249978_n.jpg",
    alt: "Heart shaped resin keychain",
    category: "keychains",
    title: "Heart Resin Keychain",
  },

  // ── Resin Art / Frames / Custom ───────────────────────────────────────
  {
    id: "pr-01",
    src: "/485184284_1103127648493148_4472142601649408182_n.jpg",
    alt: "Ocean resin art coasters on wooden tray",
    category: "resin-creations",
    title: "Ocean Resin Coaster Set",
    featured: true,
  },
  {
    id: "pr-02",
    src: "/484940750_1103127701826476_6541623168835759111_n.jpg",
    alt: "Resin creation art piece",
    category: "resin-creations",
    title: "Abstract Resin Art",
  },
  {
    id: "pr-03",
    src: "/484848537_1104255615047018_3576200409442542737_n.jpg",
    alt: "Resin decorative item",
    category: "resin-creations",
    title: "Resin Decorative Piece",
  },
  {
    id: "pr-04",
    src: "/485000195_1104243721714874_3965330763027708386_n.jpg",
    alt: "Custom resin creation",
    category: "resin-creations",
    title: "Custom Resin Creation",
  },
  {
    id: "pr-05",
    src: "/485174433_1103127571826489_2605902498143337743_n.jpg",
    alt: "Resin art piece with flowers",
    category: "resin-creations",
    title: "Floral Resin Art",
  },
  {
    id: "pr-06",
    src: "/542752928_1239676304838281_1085407903453986207_n.jpg",
    alt: "Special resin creation",
    category: "resin-creations",
    title: "Special Resin Creation",
  },
  {
    id: "pr-07",
    src: "/542761575_1238637001608878_8607990700312666146_n.jpg",
    alt: "Colourful resin design",
    category: "resin-creations",
    title: "Colourful Resin Design",
  },
  {
    id: "pr-08",
    src: "/544379059_1238639354941976_6083356652451169623_n.jpg",
    alt: "Decorative resin piece",
    category: "resin-creations",
    title: "Decorative Resin Piece",
  },
  {
    id: "pr-09",
    src: "/543548920_1238639361608642_3914618814832804184_n.jpg",
    alt: "Artistic resin work",
    category: "resin-creations",
    title: "Artistic Resin Work",
  },

  // ── Custom Frames ─────────────────────────────────────────────────────
  {
    id: "cf-01",
    src: "/529179520_1214465350692710_3362134301413191237_n.jpg",
    alt: "Custom anniversary photo frame with floral decoration by 1st Class Creative",
    category: "custom-frames",
    title: "Anniversary Custom Frame",
    featured: true,
  },
  {
    id: "cf-02",
    src: "/626581418_1362772269195350_2007381266795301988_n.jpg",
    alt: "Love photo shadow box with red roses",
    category: "custom-frames",
    title: "Love Shadow Box Frame",
    featured: true,
  },
  {
    id: "cf-03",
    src: "/557802403_1265990468873531_7381377988699630798_n.jpg",
    alt: "Happy wedding photo frame with resin letters and flowers",
    category: "custom-frames",
    title: "Wedding Memory Frame",
    featured: true,
  },
  {
    id: "cf-04",
    src: "/528129243_1214777417328170_6197078429609711030_n.jpg",
    alt: "Decorated anniversary frame",
    category: "custom-frames",
    title: "Decorated Anniversary Frame",
  },
  {
    id: "cf-05",
    src: "/527823467_1212219187583993_309434352382864918_n.jpg",
    alt: "Special occasion frame",
    category: "custom-frames",
    title: "Special Occasion Frame",
  },
  {
    id: "cf-06",
    src: "/524992618_1206708381468407_4955519291548085077_n.jpg",
    alt: "Custom photo frame creation",
    category: "custom-frames",
    title: "Custom Photo Frame",
  },
  {
    id: "cf-07",
    src: "/530267716_1214770983995480_7709955081936643237_n.jpg",
    alt: "Personalized frame with lights",
    category: "custom-frames",
    title: "Personalized Light Frame",
  },
  {
    id: "cf-08",
    src: "/528693128_1214770947328817_477929606592102439_n.jpg",
    alt: "Decorated memory frame",
    category: "custom-frames",
    title: "Memory Frame",
  },

  // ── Wedding Invitations ───────────────────────────────────────────────
  {
    id: "wi-01",
    src: "/468396156_2478270609044241_1138043242894587302_n.jpg",
    alt: "Pink peach wedding invitation set with name tags and envelope",
    category: "wedding-invitations",
    title: "Peach Blossom Wedding Invitation",
    featured: true,
  },
  {
    id: "wi-02",
    src: "/468455143_2478273399043962_6736575115530202270_n.jpg",
    alt: "Elegant wedding invitation design",
    category: "wedding-invitations",
    title: "Elegant Wedding Invitation",
  },
  {
    id: "wi-03",
    src: "/469596640_2488003968070905_8563215930763090335_n.jpg",
    alt: "Classic wedding invitation set",
    category: "wedding-invitations",
    title: "Classic Wedding Invitation",
  },
  {
    id: "wi-04",
    src: "/469675779_2488004001404235_6025248087151282527_n.jpg",
    alt: "Floral wedding invitation",
    category: "wedding-invitations",
    title: "Floral Wedding Invitation",
  },
  {
    id: "wi-05",
    src: "/468866191_2485517644986204_1161136215993109044_n.jpg",
    alt: "Custom wedding stationery",
    category: "wedding-invitations",
    title: "Custom Wedding Stationery",
  },
  {
    id: "wi-06",
    src: "/69542278_1078684385669544_1247969654853337088_n.jpg",
    alt: "Early wedding invitation design",
    category: "wedding-invitations",
    title: "Vintage Wedding Invitation",
  },

  // ── Cake Boxes ────────────────────────────────────────────────────────
  {
    id: "cb-01",
    src: "/484074106_1098277412311505_6713907112004454121_n.jpg",
    alt: "Ivory gold embossed cake box with red roses – 1st Class Creative",
    category: "cake-boxes",
    title: "Golden Rose Cake Box",
    featured: true,
  },
  {
    id: "cb-02",
    src: "/485912821_1104266158379297_7626713888688372280_n.jpg",
    alt: "Elegant cake box with decoration",
    category: "cake-boxes",
    title: "Elegant Cake Box",
  },
  {
    id: "cb-03",
    src: "/486329559_1104913934981186_4235712186103867353_n.jpg",
    alt: "Custom cake box design",
    category: "cake-boxes",
    title: "Custom Cake Box",
  },
  {
    id: "cb-04",
    src: "/486374725_1107174841421762_6927538140018557104_n.jpg",
    alt: "Cake box with ribbon",
    category: "cake-boxes",
    title: "Ribbon Cake Box",
  },
  {
    id: "cb-05",
    src: "/487146562_1110427371096509_6761094454698884201_n.jpg",
    alt: "Decorative cake box",
    category: "cake-boxes",
    title: "Decorative Cake Box",
  },
  {
    id: "cb-06",
    src: "/492230064_1130880099051236_6148917703186432318_n.jpg",
    alt: "Special occasion cake box",
    category: "cake-boxes",
    title: "Special Occasion Cake Box",
  },
  {
    id: "cb-07",
    src: "/545387736_1241483364657575_1531938091476661597_n.jpg",
    alt: "Premium cake packaging box",
    category: "cake-boxes",
    title: "Premium Cake Box",
  },
  {
    id: "cb-08",
    src: "/546986139_1243868417752403_7353421821696443066_n.jpg",
    alt: "Elegant cake box with floral accent",
    category: "cake-boxes",
    title: "Floral Accent Cake Box",
  },
];

export const featuredItems = portfolioItems.filter((i) => i.featured);

export const categoryLabels: Record<PortfolioCategory, string> = {
  "resin-creations": "Resin Creations",
  "wedding-invitations": "Wedding Invitations",
  "cake-boxes": "Cake Boxes",
  "custom-frames": "Custom Frames",
  keychains: "Resin Keychains",
  "gift-boxes": "Gift Boxes",
};
