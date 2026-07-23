from pathlib import Path
import re
import unittest


CSS = Path(__file__).parents[1] / "style-v2.css"
ROOT = CSS.parent
DEEP_LEARNING = ROOT / "deep_learning_antibiotics.html"
MESSAGE_PASSING = ROOT / "chemprop_animations" / "message_passing_animation.html"
MESSAGE_PROPAGATION = ROOT / "chemprop_animations" / "message_propagation_animation.html"


class VisualLayoutRegressionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.css = CSS.read_text()

    def test_homepage_hero_does_not_inherit_generic_section_padding(self):
        self.assertRegex(
            self.css,
            r"(?ms)^\.hero\s*\{(?:(?!\}).)*?padding:\s*0;",
        )

    def test_canvas_layer_does_not_override_the_fixed_navigation(self):
        self.assertNotRegex(
            self.css,
            r"(?ms)^\.hero,\s*\.approach,\s*\.expertise,\s*\.cta-section,\s*footer,\s*nav\s*\{(?:(?!\}).)*?position:\s*relative;",
        )

    def test_education_markers_are_centred_on_the_timeline(self):
        self.assertRegex(
            self.css,
            r"(?ms)^\.education-item::before\s*\{(?:(?!\}).)*?transform:\s*translateX\(-50%\);",
        )

    def test_code_blocks_scroll_inside_the_article_column(self):
        self.assertRegex(
            self.css,
            r"(?ms)^\.article-content pre\s*\{(?:(?!\}).)*?overflow-x:\s*auto;",
        )

    def test_mobile_section_navigation_uses_a_compact_gap(self):
        self.assertRegex(
            self.css,
            r"(?ms)@media \(max-width: 768px\).*?\.section-nav\s*\{(?:(?!\}).)*?gap:\s*0\.5rem;",
        )

    def test_deep_learning_table_has_a_mobile_scroll_container(self):
        self.assertRegex(
            DEEP_LEARNING.read_text(),
            r"(?ms)@media \(max-width: 768px\).*?\.article-content table\s*\{(?:(?!\}).)*?overflow-x:\s*auto;",
        )

    def test_chemprop_animations_scale_their_fixed_coordinate_stage(self):
        for page in (MESSAGE_PASSING, MESSAGE_PROPAGATION):
            content = page.read_text()
            self.assertIn('id="animation-stage"', content)
            self.assertIn('--animation-scale', content)

        propagation = MESSAGE_PROPAGATION.read_text()
        self.assertIn('width: 640px;', propagation)
        self.assertIn('window.innerWidth / 640', propagation)


if __name__ == "__main__":
    unittest.main()
