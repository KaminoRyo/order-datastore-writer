import { parse } from "csv-parse/sync";
import { Options, CastingFunction } from "csv-parse/sync";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { getDecoratedInfoMessage } from "./console-message.mjs";

const cast: CastingFunction = (value, context) => {
  if (context.header) {
    return value;
  }

  // 日時は2つのカラムの統合という形になるのでパース後に処理する

  const numberColumnNames = [
    "開始価格",
    "出品個数",
    "入札額",
    "入札個数",
    "落札額",
    "落札個数",
  ] as const;
  const isNumberColumn = numberColumnNames.some(
    (name) => name === context.column
  );
  if (isNumberColumn) {
    return parseInt(value);
  }
  if (context.column === "カテゴリ") {
    return value.split(">").map((category) => category.trim());
  }
  return value;
};

const parseOptions: Options = {
  delimiter: "\t",
  skip_empty_lines: true,
  columns: true,
  cast: cast,
};

export const generate = async (stringLikefilePath: string | undefined) => {
  console.info(getDecoratedInfoMessage(`📖 TSVファイルを読み込みます`));
  console.info(
    getDecoratedInfoMessage(`対象ファイルパス:${stringLikefilePath}`)
  );

  if (stringLikefilePath === undefined) {
    throw new Error(
      `引数にTSVファイルのパスが渡されていません。 "npx vite-node index.ts ./results/ヤフオク!・PayPayフリマの落札履歴.tsv" のようにファイルパスを渡してください`
    );
  }
  let filePath = "";
  try {
    filePath = resolve(stringLikefilePath);
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      throw new Error(`TSVファイルのパスが不正です`, { cause: error });
    }
  }

  const data = await readFile(filePath).catch((reason) => {
    throw new Error("ファイル読み込みに失敗しました。", { cause: reason });
  });

  const records = parse(data, parseOptions);
  return records;
};
