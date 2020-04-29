/*构建哈希数组，用于留存添加的网站 */
const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: A,
    logoType: "text",
    url: "http://www.mvcat.com",
  },
  {
    logo: "B",
    logoType: "img",
    url: "http://www.bilibili.com",
  },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
            <div class="site">
                <div class="logo"><img src='https://${simplifyUrl(
                  node.url
                )}/favicon.ico' ${node.logo} alt='${node.logo}'></div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-delete"></use>
                </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi);

    /*用来代替a标签 */
    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
/*创建站点*/
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //把一个对象变成字符串
  localStorage.setItem("x", string);
};

/*键盘导航 */
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
