import {Column, Entity} from "typeorm";
import {DeepPartial} from "@vendure/common/lib/shared-types";
import {VendureEntity} from "@vendure/core";

@Entity()
export class Banner extends VendureEntity {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column("varchar")
  title: string;

  @Column({default: false})
  active: boolean;

  @Column({type: Date})
  startDate: Date;

  @Column({type: Date})
  endDate: Date;

  @Column("text", {nullable: true})
  description: string;

  @Column("text", {nullable: true})
  descriptionHtml: string;

  @Column("text", {nullable: true})
  descriptionJson: string;

  @Column("varchar", {nullable: true})
  backgroundColorHex: string;

  @Column({default: false})
  showActionButton: boolean;

  @Column("varchar", {nullable: true})
  actionButtonLabel: string;

  @Column("varchar", {nullable: true})
  actionButtonUrl: string;

  @Column("varchar", {nullable: true})
  actionButtonBackgroundColorHex: string;

  @Column("varchar", {nullable: true})
  actionButtonFontColorHex: string;

  @Column({default: false})
  showCountdown: boolean;

  @Column("varchar", {nullable: true})
  countdownButtonBackgroundColorHex: string;

  @Column("varchar", {nullable: true})
  countdownButtonFontColorHex: string;

  @Column({default: false})
  showNewsletter: boolean;

  @Column("varchar", {nullable: true})
  newsletterButtonBackgroundColorHex: string;

  @Column("varchar", {nullable: true})
  newsletterButtonFontColorHex: string;

  @Column({default: false})
  isClosable: boolean;

  @Column("varchar", {nullable: true})
  closeButtonColorHex: string;
}
