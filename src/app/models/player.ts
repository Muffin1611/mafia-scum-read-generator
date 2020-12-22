export class Player {
  flip_post: string;
  name: string;
  nickname: string;
  pronouns: string;
  replaced_by: string;
  replaces: string;
  status: string;
  timezone: string;

  constructor(
    flip_post: string,
    name: string,
    nickname: string,
    pronouns: string,
    replaced_by: string,
    replaces: string,
    status: string,
    timezone: string
  ) {
    this.flip_post = flip_post;
    this.name = name;
    this.nickname = nickname;
    this.pronouns = pronouns;
    this.replaced_by = replaced_by;
    this.replaces = replaces;
    this.status = status;
    this.timezone = timezone;
  }
}

export function isPlayer(object: any): object is Player {
  return object && object.status && object.partner == undefined;
}

export class PlayerWithPartner {
  flip_post: string;
  name: string;
  nickname: string;
  partner: string;
  pronouns: string;
  replaced_by: string;
  replaces: string;
  status: string;
  timezone: string;

  constructor(
    flip_post: string,
    name: string,
    nickname: string,
    partner: string,
    pronouns: string,
    replaced_by: string,
    replaces: string,
    status: string,
    timezone: string
  ) {
    this.flip_post = flip_post;
    this.name = name;
    this.nickname = nickname;
    this.partner = partner;
    this.pronouns = pronouns;
    this.replaced_by = replaced_by;
    this.replaces = replaces;
    this.status = status;
    this.timezone = timezone;
  }
}

export function isPlayerWithPartner(object: any): object is PlayerWithPartner {
  return object && object.partner;
}

export class Team {
  name1: string;
  name2: string;
  alive: boolean;

  constructor(name1: string, name2: string, alive: boolean) {
    this.name1 = name1;
    this.name2 = name2;
    this.alive = alive;
  }
}
