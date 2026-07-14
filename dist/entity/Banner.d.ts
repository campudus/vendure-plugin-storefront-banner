import { DeepPartial } from "@vendure/common/lib/shared-types";
import { VendureEntity } from "@vendure/core";
export declare class Banner extends VendureEntity {
    constructor(input?: DeepPartial<Banner>);
    title: string;
    active: boolean;
    startDate: Date;
    endDate: Date;
    description: string;
    descriptionHtml: string;
    descriptionJson: string;
    backgroundColorHex: string;
    showActionButton: boolean;
    actionButtonLabel: string;
    actionButtonUrl: string;
    actionButtonBackgroundColorHex: string;
    actionButtonFontColorHex: string;
    showCountdown: boolean;
    countdownButtonBackgroundColorHex: string;
    countdownButtonFontColorHex: string;
    showNewsletter: boolean;
    newsletterButtonBackgroundColorHex: string;
    newsletterButtonFontColorHex: string;
    isClosable: boolean;
    closeButtonColorHex: string;
}
//# sourceMappingURL=Banner.d.ts.map