import { cac } from "cac";
import chalk from "chalk";
import logSymbols from "log-symbols";
import { generate } from "./data-generator.mjs";
import { errorMessageTheme } from "./color-theme.mjs";
import { getDecoratedErrorMessage } from "./console-message.mjs";

// cacを初期化
const cli = cac("Order DataStore Writer");

const action = async (stringLikefilePath: string | undefined) => {
  try {
    const records = await generate(stringLikefilePath);
    for (const record of records) {
      console.info(record);
    }
  } catch (error: unknown) {
    console.error(getDecoratedErrorMessage(`エラーが発生しました`));
    console.error(error);
  }
};

// コマンドを定義
cli
  .command(
    "[file-path]",
    "Yahoo!オークションの取引TSVファイルを読み込みます。 例: npx vite-node index.ts ./results/ヤフオク!・PayPayフリマの落札履歴.tsv"
  )
  .action(action);
cli.help();

// バージョンを設定
cli.version("0.0.1");

// コマンドをパースして実行

try {
  console.log(chalk.bgRed(` ✍ ✍ ✍ ${cli.name} ✍ ✍ ✍ `));
  // Parse CLI args without running the command
  // 引数にprocess.argvを渡さないとコマンド類が正常に処理できないので渡す。
  cli.parse(process.argv);
} catch (error: unknown) {
  console.error(logSymbols.error, errorMessageTheme(`エラーが発生しました`));
  if (error instanceof Error) {
    console.error(error.stack);
  } else {
    console.error(error);
  }
}
