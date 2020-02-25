/**
 * 1 Model for each SDG (1-16)
 *
 */

/* eslint-disable no-magic-numbers */

export default [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
  sdg => ({
    name: `Test ${sdg}`,
    sdg,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed rhoncus metus. Pellentesque vel tempor lorem. Nam mi diam, dictum in tellus ac, tempus congue turpis. Morbi tortor nunc, imperdiet eget leo ac, rhoncus vehicula risus. Vestibulum a imperdiet augue. Nam urna sem, dapibus eget sem et, sodales imperdiet nulla. Vivamus non venenatis ante, vel luctus nunc. Praesent quis sem in ante tristique gravida. Ut hendrerit pellentesque est, in ullamcorper metus rutrum eu. Curabitur et quam libero. Pellentesque non massa eleifend, ultrices risus eget, lobortis erat. Nulla facilisi. Suspendisse malesuada diam lectus, eget pulvinar libero efficitur vitae. Curabitur luctus ac dolor in molestie. Donec et tempus eros.",
    stages: {
      inspiration: {
        description:
          "Cras convallis sollicitudin neque, nec iaculis sem porta at. Etiam sit amet ante ipsum. Curabitur fermentum justo quis nibh imperdiet, vitae pellentesque felis fermentum. Duis iaculis auctor nunc, sit amet finibus odio sodales eget. Phasellus porttitor auctor nisl non finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin at consequat nunc. Pellentesque tempus quam id mattis feugiat. Integer elementum justo ut velit feugiat porttitor.",
        stakeholders: [
          {
            name: "Alice",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse id vulputate libero, eu facilisis mi.Duis vehicula augue eu suscipit malesuada.Aenean at mi eget turpis tristique consectetur.Proin arcu elit, ultrices at mi in, pulvinar eleifend velit.Vestibulum sagittis quis dui ac aliquam.Sed sed libero vitae lectus porta viverra.Nulla vestibulum nibh diam, eget tincidunt arcu malesuada nec.Aenean ac eleifend purus, tincidunt elementum ligula.Maecenas velit nulla, volutpat nec semper ac, consequat nec nibh.Curabitur imperdiet bibendum nibh, at luctus erat dapibus id.Pellentesque tincidunt id urna pulvinar malesuada.Sed non ante at ipsum vulputate eleifend."
          },
          {
            name: "Ashwin",
            description:
              "Quisque tempus eu arcu sed consectetur. Curabitur non fermentum risus. Donec et pellentesque elit. Sed porta pellentesque nibh. Phasellus ultrices neque nec massa pharetra ultrices. Suspendisse laoreet arcu non tempus malesuada. Morbi ultrices nunc sapien, sit amet rutrum ante auctor tristique. Fusce consectetur efficitur sem, quis laoreet elit imperdiet viverra. Praesent imperdiet nisl vel lacus tincidunt commodo. Aenean lacinia at lacus luctus lacinia."
          }
        ],
        challenges: [
          {
            name: "Ashank",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          },
          {
            name: "Brandon",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          }
        ],
        insights: [
          {
            name: "Sahi",
            description:
              "Maecenas sit amet turpis a lacus vehicula fermentum. In dignissim elementum nisl, in laoreet nisi ultricies ac. Integer id dapibus nisi. Nullam lacinia ex ac nunc dapibus, vel molestie orci egestas. In facilisis lobortis libero vitae eleifend. Nulla non lectus fermentum, semper metus a, vehicula metus. Aenean purus dui, pulvinar eget augue et, ultrices auctor urna. Etiam posuere, elit quis tincidunt molestie, neque neque auctor orci, in mollis turpis sem eget turpis. Nam euismod purus a volutpat laoreet. Fusce diam erat, tempor sit amet laoreet ut, sagittis eu sem."
          },
          {
            name: "Zayyan",
            description:
              "Praesent efficitur porta sem non commodo. Suspendisse non velit euismod, porttitor urna sit amet, malesuada eros. Duis non tincidunt nisi. Cras facilisis odio et neque ultricies luctus. Vestibulum dignissim ante a felis ornare, sit amet luctus nunc sagittis. Fusce convallis mauris massa, a consectetur tortor gravida auctor. Integer congue ipsum at augue ultrices fringilla. Aenean consequat massa ac justo hendrerit, sit amet consectetur tellus aliquet. Vestibulum pulvinar elementum tempus. Etiam id feugiat enim, vitae facilisis ante. Vestibulum egestas faucibus feugiat. Nunc leo diam, hendrerit nec eros vitae, eleifend dictum lectus. Praesent a elementum dolor, vitae varius ipsum. In tempor egestas erat quis tincidunt."
          }
        ]
      },
      ideation: {
        description:
          "Morbi fermentum bibendum ligula eu ultricies. Curabitur ut metus tortor. Curabitur convallis gravida convallis. Praesent vestibulum fringilla consectetur. Cras aliquet pretium nulla quis rutrum. Donec et elit dapibus, maximus diam a, pretium odio. Pellentesque nibh enim, blandit sit amet sodales non, tempus ac diam. Curabitur ac facilisis augue. Aenean metus turpis, tempor vel enim ac, dapibus condimentum augue. Sed sagittis posuere faucibus. Sed ex nibh, sollicitudin vel diam eu, maximus varius mi. Integer blandit nisl et dolor euismod, id bibendum ligula vehicula. Ut non rutrum mi. Maecenas viverra ligula vitae dolor imperdiet porta. Quisque tristique ut leo aliquet accumsan. Nullam orci augue, convallis sit amet diam et, blandit aliquet turpis.",
        stakeholders: [
          {
            name: "Alice",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse id vulputate libero, eu facilisis mi.Duis vehicula augue eu suscipit malesuada.Aenean at mi eget turpis tristique consectetur.Proin arcu elit, ultrices at mi in, pulvinar eleifend velit.Vestibulum sagittis quis dui ac aliquam.Sed sed libero vitae lectus porta viverra.Nulla vestibulum nibh diam, eget tincidunt arcu malesuada nec.Aenean ac eleifend purus, tincidunt elementum ligula.Maecenas velit nulla, volutpat nec semper ac, consequat nec nibh.Curabitur imperdiet bibendum nibh, at luctus erat dapibus id.Pellentesque tincidunt id urna pulvinar malesuada.Sed non ante at ipsum vulputate eleifend."
          },
          {
            name: "Ashwin",
            description:
              "Quisque tempus eu arcu sed consectetur. Curabitur non fermentum risus. Donec et pellentesque elit. Sed porta pellentesque nibh. Phasellus ultrices neque nec massa pharetra ultrices. Suspendisse laoreet arcu non tempus malesuada. Morbi ultrices nunc sapien, sit amet rutrum ante auctor tristique. Fusce consectetur efficitur sem, quis laoreet elit imperdiet viverra. Praesent imperdiet nisl vel lacus tincidunt commodo. Aenean lacinia at lacus luctus lacinia."
          }
        ],
        challenges: [
          {
            name: "Ashank",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          },
          {
            name: "Brandon",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          }
        ],
        insights: [
          {
            name: "Sahi",
            description:
              "Maecenas sit amet turpis a lacus vehicula fermentum. In dignissim elementum nisl, in laoreet nisi ultricies ac. Integer id dapibus nisi. Nullam lacinia ex ac nunc dapibus, vel molestie orci egestas. In facilisis lobortis libero vitae eleifend. Nulla non lectus fermentum, semper metus a, vehicula metus. Aenean purus dui, pulvinar eget augue et, ultrices auctor urna. Etiam posuere, elit quis tincidunt molestie, neque neque auctor orci, in mollis turpis sem eget turpis. Nam euismod purus a volutpat laoreet. Fusce diam erat, tempor sit amet laoreet ut, sagittis eu sem."
          },
          {
            name: "Zayyan",
            description:
              "Praesent efficitur porta sem non commodo. Suspendisse non velit euismod, porttitor urna sit amet, malesuada eros. Duis non tincidunt nisi. Cras facilisis odio et neque ultricies luctus. Vestibulum dignissim ante a felis ornare, sit amet luctus nunc sagittis. Fusce convallis mauris massa, a consectetur tortor gravida auctor. Integer congue ipsum at augue ultrices fringilla. Aenean consequat massa ac justo hendrerit, sit amet consectetur tellus aliquet. Vestibulum pulvinar elementum tempus. Etiam id feugiat enim, vitae facilisis ante. Vestibulum egestas faucibus feugiat. Nunc leo diam, hendrerit nec eros vitae, eleifend dictum lectus. Praesent a elementum dolor, vitae varius ipsum. In tempor egestas erat quis tincidunt."
          }
        ]
      },
      implementation: {
        description:
          "Donec a velit est. Sed lobortis nec dolor molestie egestas. Etiam tempus commodo elementum. Nulla consequat libero sit amet magna vehicula viverra. Etiam efficitur nibh sed nunc vestibulum, ac blandit est viverra. Donec feugiat nunc ante, eu dictum justo porta et. Vestibulum scelerisque, ligula in imperdiet lobortis, leo tellus hendrerit risus, id fringilla mauris nibh ac eros. Fusce quis risus urna. Nulla metus augue, venenatis sed dolor eget, blandit euismod massa. Donec vitae neque scelerisque, tristique turpis a, condimentum velit. Curabitur elementum dui sed justo porttitor ullamcorper. Curabitur vitae libero nisi. Praesent volutpat in felis sodales vulputate.",
        stakeholders: [
          {
            name: "Alice",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse id vulputate libero, eu facilisis mi.Duis vehicula augue eu suscipit malesuada.Aenean at mi eget turpis tristique consectetur.Proin arcu elit, ultrices at mi in, pulvinar eleifend velit.Vestibulum sagittis quis dui ac aliquam.Sed sed libero vitae lectus porta viverra.Nulla vestibulum nibh diam, eget tincidunt arcu malesuada nec.Aenean ac eleifend purus, tincidunt elementum ligula.Maecenas velit nulla, volutpat nec semper ac, consequat nec nibh.Curabitur imperdiet bibendum nibh, at luctus erat dapibus id.Pellentesque tincidunt id urna pulvinar malesuada.Sed non ante at ipsum vulputate eleifend."
          },
          {
            name: "Ashwin",
            description:
              "Quisque tempus eu arcu sed consectetur. Curabitur non fermentum risus. Donec et pellentesque elit. Sed porta pellentesque nibh. Phasellus ultrices neque nec massa pharetra ultrices. Suspendisse laoreet arcu non tempus malesuada. Morbi ultrices nunc sapien, sit amet rutrum ante auctor tristique. Fusce consectetur efficitur sem, quis laoreet elit imperdiet viverra. Praesent imperdiet nisl vel lacus tincidunt commodo. Aenean lacinia at lacus luctus lacinia."
          }
        ],
        challenges: [
          {
            name: "Ashank",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          },
          {
            name: "Brandon",
            description:
              "Pellentesque at sapien dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed fringilla dapibus varius. Quisque a ultrices ex. Nulla facilisi. Cras purus arcu, fermentum id ultrices et, gravida sit amet ligula. Suspendisse sit amet imperdiet mauris, eu semper tellus. In et est et ante mattis finibus. Donec ullamcorper urna nulla, ut tincidunt nibh convallis tincidunt. Phasellus malesuada libero sagittis, volutpat sapien sollicitudin, dictum neque. Pellentesque laoreet, tortor in mattis laoreet, tellus sem fermentum mauris, at tempor nisl odio pellentesque felis. Proin hendrerit urna nec nulla commodo accumsan. Mauris dapibus ultricies ligula, vitae iaculis sapien eleifend eget. Integer vel mauris volutpat, commodo augue non, molestie velit. Vestibulum imperdiet pulvinar felis eu commodo."
          }
        ],
        insights: [
          {
            name: "Sahi",
            description:
              "Maecenas sit amet turpis a lacus vehicula fermentum. In dignissim elementum nisl, in laoreet nisi ultricies ac. Integer id dapibus nisi. Nullam lacinia ex ac nunc dapibus, vel molestie orci egestas. In facilisis lobortis libero vitae eleifend. Nulla non lectus fermentum, semper metus a, vehicula metus. Aenean purus dui, pulvinar eget augue et, ultrices auctor urna. Etiam posuere, elit quis tincidunt molestie, neque neque auctor orci, in mollis turpis sem eget turpis. Nam euismod purus a volutpat laoreet. Fusce diam erat, tempor sit amet laoreet ut, sagittis eu sem."
          },
          {
            name: "Zayyan",
            description:
              "Praesent efficitur porta sem non commodo. Suspendisse non velit euismod, porttitor urna sit amet, malesuada eros. Duis non tincidunt nisi. Cras facilisis odio et neque ultricies luctus. Vestibulum dignissim ante a felis ornare, sit amet luctus nunc sagittis. Fusce convallis mauris massa, a consectetur tortor gravida auctor. Integer congue ipsum at augue ultrices fringilla. Aenean consequat massa ac justo hendrerit, sit amet consectetur tellus aliquet. Vestibulum pulvinar elementum tempus. Etiam id feugiat enim, vitae facilisis ante. Vestibulum egestas faucibus feugiat. Nunc leo diam, hendrerit nec eros vitae, eleifend dictum lectus. Praesent a elementum dolor, vitae varius ipsum. In tempor egestas erat quis tincidunt."
          }
        ]
      }
    }
  })
);
