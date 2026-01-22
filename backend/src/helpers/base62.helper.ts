import { prisma } from "../helpers/prisma.helper";

export class Base62Helper {
  ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  BASE = 62n;
  MAX = this.BASE ** 7n;
  SECRET = BigInt(process.env.SECRET_KEY || "");

  private encodeBase62(num: bigint): string {
    let result = "";
    while (num > 0n) {
      result = this.ALPHABET[Number(num % this.BASE)] + result;
      num /= this.BASE;
    }
    return result;
  }

  private padBase62(str: string): string {
    return str.padStart(7, "0");
  }

  private obfuscateCount(count: bigint): bigint {
    return count ^ this.SECRET;
  }

  /** Generate a unique base62 ID of length 7 using a database counter sequence */
  public async generateBase62Id(): Promise<string> {
    const counter = await prisma.$queryRaw<{ count: string }[]>`
    SELECT nextval('base62_counter') AS count 
  `;

    if (!counter) {
      throw new Error("Failed to retrieve base62 counter");
    }

    let count = BigInt(counter[0].count);

    if (count >= this.MAX) {
      throw new Error("Base62 limit reached");
    }

    count = this.obfuscateCount(count);

    return this.padBase62(this.encodeBase62(count));
  }
}
