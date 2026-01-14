{
  description = ''
    devShell configurations for smd-ka website development.
    Targeted for Nix users.
  '';
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };
  outputs =
    { self, nixpkgs, ... }@inputs:
    let
      outputs = self.outputs;
      lib = nixpkgs.lib // outputs.lib;
      inherit (lib.trivial) pipe;
    in
    {

      lib = {
        supportedSystems = builtins.attrNames nixpkgs.legacyPackages;
        systemSpecificVars = system: {
          pkgs = import inputs.nixpkgs { inherit system; };
          inherit system;
        };
        forAllSystems =
          gen: lib.genAttrs lib.supportedSystems (system: gen (lib.systemSpecificVars system));
      };

      devShells = lib.forAllSystems (
        { pkgs, system, ... }:
        rec {
          default = smd-ka;
          smd-ka = pkgs.mkShell {
            # all these must be listed in ./README.md as well
            packages = with pkgs; [
              go
              nodejs # includes npm; may select specific version with suffix _23
            ];
            shellHook =
              let
                # sed helpers
                sedRun = arg: "sed -nE ${lib.escapeShellArg arg} README.md";
                sedSel = { start, end }: "/${start}/,/${end}/";
                # EDIT those when editing titles or other markers in ./README.md
                readmeMarkers = {
                  # in the same order as in the readme
                  development.start = "^## Development";
                  configureEnv.start = "^### Configure Environment";
                  codeBlock.start = "^```sh$";
                  codeBlock.end = "^```$";
                  configureEnv.end = "^### "; # i.e. next header
                  development.end = "^## "; # i.e. next header
                };
                configEnvSel = with readmeMarkers; ''
                  ${sedSel development}{${sedSel configureEnv}{${sedSel codeBlock}{//!p}}}
                '';
                deplSectionSel = with readmeMarkers; ''
                  ${sedSel development}{${sedSel configureEnv}{
                    /${configureEnv.start}/d;
                    /${configureEnv.end}/p;
                    d
                  };p}
                '';
              in
              ''
                # execute block from README.md
                eval "$(${sedRun configEnvSel})"
                # show development manual
                ${sedRun deplSectionSel} | ${lib.getExe pkgs.glow} /dev/stdin
                # flake.devShells exclusive
                PS1="''${PS1}\\033[38;5;2m<devShells.smd-ka>\\033[0m "
              '';
          };
        }
      );

    };
}
