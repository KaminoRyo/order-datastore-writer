import cac from "cac";

console.log("💥 START CLI PROGRAM 💥");

// cacを初期化
const cli = cac("sample-app");

// コマンドを定義
cli.command("hello", "say hello world").action(() => {
  console.log("Hello World!");
});

cli.help();

// バージョンを設定
cli.version("0.0.0-sample");

// コマンドをパースして実行

try {
  // console.log(process.argv);
  // Parse CLI args without running the command
  const parsed = cli.parse(process.argv);
  console.log(parsed);
} catch (error) {
  console.error(`❌ エラーが発生しました`);
  console.error(error.stack);
}
