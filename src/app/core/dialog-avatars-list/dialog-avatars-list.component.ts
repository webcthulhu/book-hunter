import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-avatars-list',
  templateUrl: './dialog-avatars-list.component.html',
  styleUrls: ['./dialog-avatars-list.component.scss']
})
export class DialogAvatarsListComponent {
  public readonly avatars: string[] = [
    '001-centaur.png', '002-kraken.png', '003-dinosaur.png', '004-tree-1.png',
    '005-hand.png', '006-echidna.png', '007-robot.png', '008-mushroom.png', '009-harpy.png',
    '010-phoenix.png', '011-dragon-1.png', '012-devil.png', '013-troll.png', '014-alien.png',
    '015-minotaur.png', '016-madre-monte.png', '017-satyr.png', '018-karakasakozou.png', '019-pirate.png',
    '020-werewolf.png', '021-scarecrow.png', '022-valkyrie.png', '023-curupira.png', '024-loch-ness-monster.png',
    '025-tree.png', '026-cerberus.png', '027-gryphon.png', '028-mermaid.png', '029-vampire.png',
    '030-goblin.png', '031-yeti.png', '032-leprechaun.png', '033-medusa.png', '034-chimera.png',
    '035-elf.png', '036-hydra.png', '037-cyclops.png', '038-pegasus.png', '039-narwhal.png',
    '040-woodcutter.png', '041-zombie.png', '042-dragon.png', '043-frankenstein.png', '044-witch.png',
    '045-fairy.png', '046-genie.png', '047-pinocchio.png', '048-ghost.png', '049-wizard.png', '050-unicorn.png'
  ];
  constructor(public dialogRef: MatDialogRef<DialogAvatarsListComponent>) {}
  onImageClick(avatar: string) {
    this.dialogRef.close(avatar);
  }
}
